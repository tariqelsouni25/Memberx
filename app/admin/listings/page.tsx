import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Search, Filter, Plus, Eye, Edit, CheckCircle, XCircle } from 'lucide-react';

interface SearchParams {
  searchParams: Promise<{ status?: string; city?: string; category?: string; search?: string }>;
}

async function getListings(filters: any) {
  const where: any = {};

  if (filters.status && filters.status !== 'all') {
    where.status = filters.status;
  }
  if (filters.city) {
    where.cityId = filters.city;
  }
  if (filters.category) {
    where.categoryId = filters.category;
  }
  if (filters.search) {
    where.OR = [
      { titleAr: { contains: filters.search, mode: 'insensitive' } },
      { titleEn: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  const [listings, cities, categories] = await Promise.all([
    db.listing.findMany({
      where,
      include: {
        city: true,
        category: true,
        vendor: true,
        assets: { take: 1, orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
    db.city.findMany({ where: { isActive: true } }),
    db.category.findMany({ where: { isActive: true } }),
  ]);

  return { listings, cities, categories };
}

export default async function AdminListingsPage({ searchParams }: SearchParams) {
  const session = await auth();

  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'CONTENT_EDITOR')) {
    redirect('/auth/signin?callbackUrl=/admin/listings');
  }

  const params = await searchParams;
  const { listings, cities, categories } = await getListings(params);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'default';
      case 'DRAFT':
        return 'secondary';
      case 'PENDING':
        return 'outline';
      case 'APPROVED':
        return 'default';
      case 'ENDED':
      case 'ARCHIVED':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      DRAFT: 'مسودة',
      PENDING: 'بانتظار الموافقة',
      APPROVED: 'موافق عليه',
      LIVE: 'منشور',
      ENDED: 'منتهي',
      ARCHIVED: 'مؤرشف',
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary mb-1 block">
                ← العودة للوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold">إدارة العروض (Listings)</h1>
            </div>
            <Button asChild>
              <Link href="/admin/listings/new">
                <Plus className="w-4 h-4 ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                إضافة عرض
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground [dir=rtl]:right-auto [dir=rtl]:left-3" />
                <Input placeholder="بحث..." className="pr-10 [dir=rtl]:pr-3 [dir=rtl]:pl-10" />
              </div>

              <Select defaultValue={params.status || 'all'}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="DRAFT">مسودة</SelectItem>
                  <SelectItem value="PENDING">بانتظار الموافقة</SelectItem>
                  <SelectItem value="APPROVED">موافق عليه</SelectItem>
                  <SelectItem value="LIVE">منشور</SelectItem>
                  <SelectItem value="ENDED">منتهي</SelectItem>
                  <SelectItem value="ARCHIVED">مؤرشف</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue={params.city || 'all'}>
                <SelectTrigger>
                  <SelectValue placeholder="المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المدن</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={params.category || 'all'}>
                <SelectTrigger>
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                تطبيق الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Listings Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>العروض ({listings.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {listings.length > 0 ? (
              <div className="space-y-3">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {listing.assets[0] && (
                      <img
                        src={listing.assets[0].url}
                        alt={listing.titleAr}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 truncate">{listing.titleAr}</h3>
                      <div className="flex items-center gap-2 mb-1 text-sm text-muted-foreground">
                        <span>{listing.vendor.nameAr}</span>
                        <span>•</span>
                        <span>{listing.city.nameAr}</span>
                        <span>•</span>
                        <span>{listing.category.nameAr}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(listing.status) as any}>{getStatusLabel(listing.status)}</Badge>
                        <span className="font-medium text-primary tabular-nums">{formatPrice(listing.priceSale)}</span>
                        {listing.discountPct && <span className="text-sm text-green-600">{listing.discountPct}% خصم</span>}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {listing.status === 'PENDING' && (
                        <>
                          <Button variant="outline" size="icon" className="text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/deal/${listing.slug}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/listings/${listing.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">لا توجد عروض</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

