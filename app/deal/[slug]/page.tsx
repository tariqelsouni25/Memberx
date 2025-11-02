import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { MapPin, Clock, CheckCircle2, ShoppingCart } from 'lucide-react';
import { BadgeType } from '@prisma/client';

interface DealDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export async function generateStaticParams() {
  const listings = await db.listing.findMany({
    where: { status: 'LIVE', isActive: true },
    select: { slug: true },
    take: 100,
  });

  return listings.map((listing) => ({
    slug: listing.slug,
  }));
}

async function getDealData(slug: string) {
  const deal = await db.listing.findUnique({
    where: { slug },
    include: {
      vendor: true,
      city: true,
      category: true,
      assets: { orderBy: { order: 'asc' } },
      variants: { where: { isActive: true }, orderBy: { order: 'asc' } },
      terms: { orderBy: { order: 'asc' } },
      faqs: { orderBy: { order: 'asc' } },
    },
  });

  return deal;
}

export default async function DealDetailPage({ params, searchParams }: DealDetailPageProps) {
  const { slug } = await params;
  const { lang = 'ar' } = await searchParams;

  const deal = await getDealData(slug);

  if (!deal) {
    notFound();
  }

  const isAr = lang === 'ar';
  const discount = deal.discountPct || calculateDiscount(deal.priceOriginal, deal.priceSale);

  const getBadgeVariant = (badge: BadgeType): any => {
    const map: Record<BadgeType, string> = {
      HOT: 'hot',
      BEST_SELLER: 'bestSeller',
      FLASH: 'flash',
      DISCOUNT: 'discount',
      NEW: 'new',
    };
    return map[badge] || 'default';
  };

  const getBadgeLabel = (badge: BadgeType): string => {
    if (isAr) {
      const labels: Record<BadgeType, string> = {
        HOT: 'ساخن',
        BEST_SELLER: 'الأكثر مبيعاً',
        FLASH: 'عرض خاطف',
        DISCOUNT: `خصم ${discount}%`,
        NEW: 'جديد',
      };
      return labels[badge];
    } else {
      const labels: Record<BadgeType, string> = {
        HOT: 'Hot',
        BEST_SELLER: 'Best Seller',
        FLASH: 'Flash',
        DISCOUNT: `${discount}% OFF`,
        NEW: 'New',
      };
      return labels[badge];
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={lang} city={deal.city.slug} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/deals/${deal.city.slug}`} className="hover:text-primary">
              {isAr ? deal.city.nameAr : deal.city.nameEn}
            </Link>
            <span>/</span>
            <Link href={`/deals/${deal.city.slug}/${deal.category.slug}`} className="hover:text-primary">
              {isAr ? deal.category.nameAr : deal.category.nameEn}
            </Link>
            <span>/</span>
            <span>{isAr ? deal.titleAr : deal.titleEn}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="rounded-lg overflow-hidden">
                {deal.assets.length > 0 && (
                  <div className="relative aspect-video">
                    <Image
                      src={deal.assets[0].url}
                      alt={isAr ? deal.titleAr : deal.titleEn}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                {deal.assets.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {deal.assets.slice(1, 5).map((asset, idx) => (
                      <div key={asset.id} className="relative aspect-video rounded overflow-hidden cursor-pointer hover:opacity-80">
                        <Image src={asset.url} alt={`Image ${idx + 2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Deal Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {deal.badges.map((badge, idx) => (
                      <Badge key={idx} variant={getBadgeVariant(badge) as any}>
                        {getBadgeLabel(badge)}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="text-3xl font-bold mb-2">{isAr ? deal.titleAr : deal.titleEn}</h1>
                  {deal.subtitleAr && (
                    <p className="text-xl text-muted-foreground mb-4">{isAr ? deal.subtitleAr : deal.subtitleEn}</p>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <Link href={`/vendor/${deal.vendor.slug}`} className="hover:text-primary">
                        {isAr ? deal.vendor.nameAr : deal.vendor.nameEn}
                      </Link>
                    </div>
                    {deal.endsAt && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {isAr ? 'ينتهي ' : 'Ends '}
                          {new Date(deal.endsAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {deal.descAr && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h2 className="font-semibold text-lg mb-3">{isAr ? 'التفاصيل' : 'Details'}</h2>
                        <p className="text-muted-foreground whitespace-pre-line">{isAr ? deal.descAr : deal.descEn}</p>
                      </div>
                    </>
                  )}

                  {(deal.highlightsAr?.length > 0) && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h2 className="font-semibold text-lg mb-3">{isAr ? 'المميزات' : 'Highlights'}</h2>
                        <ul className="space-y-2">
                          {(isAr ? deal.highlightsAr : deal.highlightsEn).map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {deal.terms.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h2 className="font-semibold text-lg mb-3">{isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}</h2>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {deal.terms.map((term) => (
                            <li key={term.id}>• {isAr ? term.contentAr : term.contentEn}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {deal.faqs.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h2 className="font-semibold text-lg mb-3">{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</h2>
                        <div className="space-y-4">
                          {deal.faqs.map((faq) => (
                            <div key={faq.id}>
                              <h3 className="font-medium mb-1">{isAr ? faq.questionAr : faq.questionEn}</h3>
                              <p className="text-sm text-muted-foreground">{isAr ? faq.answerAr : faq.answerEn}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-2 border-primary">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-bold text-primary tabular-nums">{formatPrice(deal.priceSale)}</span>
                        <span className="text-xl text-muted-foreground line-through tabular-nums">{formatPrice(deal.priceOriginal)}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {isAr ? 'وفر' : 'Save'} {discount}%
                      </div>
                    </div>

                    {deal.variants.length > 0 && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">{isAr ? 'اختر الخيار' : 'Select Option'}</label>
                        <div className="space-y-2">
                          {deal.variants.map((variant) => (
                            <label key={variant.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted">
                              <input type="radio" name="variant" value={variant.id} className="text-primary" />
                              <div className="flex-1">
                                <div className="font-medium">{isAr ? variant.nameAr : variant.nameEn}</div>
                                {variant.priceAdjust !== 0 && (
                                  <div className="text-sm text-muted-foreground">
                                    {variant.priceAdjust > 0 ? '+' : ''}
                                    {formatPrice(variant.priceAdjust)}
                                  </div>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {deal.requiresSlot && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">{isAr ? 'اختر التاريخ والوقت' : 'Select Date & Time'}</label>
                        <p className="text-sm text-muted-foreground mb-3">
                          {isAr ? 'يرجى تحديد موعد الحجز' : 'Please select a booking time'}
                        </p>
                        <Button variant="outline" className="w-full">
                          {isAr ? 'اختر التاريخ والوقت' : 'Choose Date & Time'}
                        </Button>
                      </div>
                    )}

                    <Button size="xl" className="w-full">
                      <ShoppingCart className="w-5 h-5 ml-2 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                      {isAr ? 'أضف للسلة' : 'Add to Cart'}
                    </Button>

                    {deal.stock && (
                      <p className="text-sm text-center text-muted-foreground mt-3">
                        {isAr ? `متبقي ${deal.stock} عرض` : `${deal.stock} offers remaining`}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={lang} />
    </div>
  );
}

