import { Resend } from 'resend';

// Initialize Resend conditionally - handle missing API key during build
function createResendClient() {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not found. Email functionality will be disabled.');
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const resend = createResendClient();

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  // Guard against missing Resend client
  if (!resend) {
    console.error('Email service not initialized. Check RESEND_API_KEY environment variable.');
    throw new Error('Email service not available');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from || 'Member X <noreply@memberx.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Email send error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export function generateOrderConfirmationEmail(order: any, locale: string = 'ar'): string {
  if (locale === 'ar') {
    return `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Cairo', Arial, sans-serif; direction: rtl; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066FF; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .order-number { font-size: 24px; font-weight: bold; color: #0066FF; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>تم تأكيد طلبك!</h1>
          </div>
          <div class="content">
            <p>عزيزي ${order.customerName},</p>
            <p>شكراً لك على طلبك من Member X</p>
            <p class="order-number">رقم الطلب: ${order.orderNumber}</p>
            <p>الإجمالي: ${order.total} ر.س</p>
            <p>سنرسل لك قسائمك قريباً.</p>
          </div>
          <div class="footer">
            <p>© 2025 Member X. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  } else {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066FF; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .order-number { font-size: 24px; font-weight: bold; color: #0066FF; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear ${order.customerName},</p>
            <p>Thank you for your order from Member X</p>
            <p class="order-number">Order Number: ${order.orderNumber}</p>
            <p>Total: SAR ${order.total}</p>
            <p>Your vouchers will be sent to you shortly.</p>
          </div>
          <div class="footer">
            <p>© 2025 Member X. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export function generateVoucherEmail(voucher: any, locale: string = 'ar'): string {
  if (locale === 'ar') {
    return `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Cairo', Arial, sans-serif; direction: rtl; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .voucher { border: 2px dashed #0066FF; padding: 30px; text-align: center; margin: 20px 0; }
          .code { font-size: 32px; font-weight: bold; color: #0066FF; letter-spacing: 2px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>قسيمتك جاهزة!</h1>
          <div class="voucher">
            <div class="code">${voucher.code}</div>
            <p>صالحة حتى: ${new Date(voucher.validUntil).toLocaleDateString('ar-SA')}</p>
          </div>
          <p>استخدم هذا الكود عند الاسترداد.</p>
        </div>
      </body>
      </html>
    `;
  } else {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .voucher { border: 2px dashed #0066FF; padding: 30px; text-align: center; margin: 20px 0; }
          .code { font-size: 32px; font-weight: bold; color: #0066FF; letter-spacing: 2px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your Voucher is Ready!</h1>
          <div class="voucher">
            <div class="code">${voucher.code}</div>
            <p>Valid until: ${new Date(voucher.validUntil).toLocaleDateString('en-US')}</p>
          </div>
          <p>Use this code when redeeming.</p>
        </div>
      </body>
      </html>
    `;
  }
}

