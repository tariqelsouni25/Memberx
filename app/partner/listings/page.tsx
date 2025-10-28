import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

async function getPartnerListings(userId: string) {
  const vendor = await db.vendor.findFirst({
    where: { managerId: userId },
  });

  if (!vendor) return null;

  const listings = await db.listing.findMany({
    where: { vendorId: vendor.id },
    include: {
      city: true,
      category: true,
      assets: { take: 1, orderBy: { order: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return { vendor, listings };
}

export default async function PartnerListingsPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== 'PARTNER' && session.user.role !== 'ADMIN')) {
    redirect('/auth/signin?callbackUrl=/partner/listings');
  }

  const data = await getPartnerListings(session.user.id!);

  if (!data) {
    redirect('/partner');
  }

  const { vendor, listings } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'default';
      case 'DRAFT':
        return 'secondary';
      case 'PENDING':
        return 'outline';
      case 'ENDED':
      case 'ARCHIVED':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/partner" className="text-sm text-muted-foreground hover:text-primary mb-1 block">
                ← العودة للوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold">إدارة العروض</h1>
            </div>
            <Button asChild>
              <Link href="/partner/listings/new">
                <Plus className="w-4 h-4 ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                إضافة عرض جديد
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>عروض {vendor.nameAr}</CardTitle>
          </CardHeader>
          <CardContent>
            {listings.length > 0 ? (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {listing.assets[0] && (
                      <img
                        src={listing.assets[0].url}
                        alt={listing.titleAr}
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{listing.titleAr}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getStatusColor(listing.status) as any}>{listing.status}</Badge>
                        <span className="text-sm text-muted-foreground">{listing.city.nameAr}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{listing.category.nameAr}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary tabular-nums">{formatPrice(listing.priceSale)}</span>
                        <span className="text-sm text-muted-foreground line-through tabular-nums">
                          {formatPrice(listing.priceOriginal)}
                        </span>
                        {listing.discountPct && (
                          <Badge variant="discount">{listing.discountPct}% خصم</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/deal/${listing.slug}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/partner/listings/${listing.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">لم تقم بإضافة أي عروض بعد</p>
                <Button asChild>
                  <Link href="/partner/listings/new">
                    <Plus className="w-4 h-4 ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                    إضافة أول عرض
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

