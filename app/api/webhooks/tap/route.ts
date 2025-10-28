import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail, generateOrderConfirmationEmail, generateVoucherEmail } from '@/lib/email';
import { generateCode } from '@/lib/utils';

// Tap payment webhook handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const signature = req.headers.get('x-tap-signature');

    // Verify webhook signature (in production)
    // if (!verifySignature(body, signature, process.env.TAP_WEBHOOK_SECRET!)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const { id: transactionId, status, amount, currency, reference, metadata } = body;

    // Find the order
    const order = await db.order.findFirst({
      where: { orderNumber: reference.order },
      include: {
        user: true,
        items: {
          include: {
            listing: true,
            variant: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update payment
    const payment = await db.payment.findFirst({
      where: { orderId: order.id, transactionId },
    });

    if (payment) {
      await db.payment.update({
        where: { id: payment.id },
        data: {
          status: status === 'CAPTURED' ? 'COMPLETED' : 'FAILED',
          completedAt: status === 'CAPTURED' ? new Date() : undefined,
        },
      });
    } else {
      await db.payment.create({
        data: {
          orderId: order.id,
          provider: 'TAP',
          transactionId,
          status: status === 'CAPTURED' ? 'COMPLETED' : 'FAILED',
          amount: amount / 100, // Convert from smallest currency unit
          currency,
          completedAt: status === 'CAPTURED' ? new Date() : undefined,
        },
      });
    }

    // If payment successful, create bookings and vouchers
    if (status === 'CAPTURED') {
      await db.order.update({
        where: { id: order.id },
        data: {
          status: 'CONFIRMED',
          confirmedAt: new Date(),
        },
      });

      // Create bookings for items with slots
      for (const item of order.items) {
        if (metadata?.slotId) {
          await db.booking.create({
            data: {
              bookingRef: `BK-${generateCode(8)}`,
              userId: order.userId,
              orderId: order.id,
              slotId: metadata.slotId,
              status: 'CONFIRMED',
              quantity: item.quantity,
              customerName: order.customerName,
              customerEmail: order.customerEmail,
              customerPhone: order.customerPhone,
              confirmedAt: new Date(),
            },
          });

          // Update slot booked count
          await db.timeSlot.update({
            where: { id: metadata.slotId },
            data: { booked: { increment: item.quantity } },
          });
        }
      }

      // Create vouchers
      const voucherExpiryDays = parseInt(process.env.VOUCHER_EXPIRY_DAYS || '60');
      for (const item of order.items) {
        for (let i = 0; i < item.quantity; i++) {
          const voucher = await db.voucher.create({
            data: {
              code: generateCode(10),
              orderId: order.id,
              status: 'ACTIVE',
              validFrom: new Date(),
              validUntil: new Date(Date.now() + voucherExpiryDays * 24 * 60 * 60 * 1000),
            },
          });

          // Send voucher email
          try {
            await sendEmail({
              to: order.customerEmail,
              subject: 'قسيمتك من Member X',
              html: generateVoucherEmail(voucher, 'ar'),
            });
          } catch (error) {
            console.error('Failed to send voucher email:', error);
          }
        }
      }

      // Send order confirmation
      try {
        await sendEmail({
          to: order.customerEmail,
          subject: 'تأكيد طلبك من Member X',
          html: generateOrderConfirmationEmail(order, 'ar'),
        });
      } catch (error) {
        console.error('Failed to send order confirmation:', error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

