/**
 * Seed script for homepage data
 * Run with: npx tsx scripts/seed-homepage.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding homepage data...');

  // Create cities if they don't exist
  const cities = await Promise.all([
    prisma.city.upsert({
      where: { slug: 'riyadh' },
      update: {},
      create: {
        slug: 'riyadh',
        nameAr: 'الرياض',
        nameEn: 'Riyadh',
        isActive: true,
        order: 1,
      },
    }),
    prisma.city.upsert({
      where: { slug: 'jeddah' },
      update: {},
      create: {
        slug: 'jeddah',
        nameAr: 'جدة',
        nameEn: 'Jeddah',
        isActive: true,
        order: 2,
      },
    }),
    prisma.city.upsert({
      where: { slug: 'dammam' },
      update: {},
      create: {
        slug: 'dammam',
        nameAr: 'الدمام',
        nameEn: 'Dammam',
        isActive: true,
        order: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${cities.length} cities`);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'food-dining' },
      update: {},
      create: {
        slug: 'food-dining',
        nameAr: 'مطاعم ومقاهي',
        nameEn: 'Food & Dining',
        descAr: 'اكتشف أفضل المطاعم والمقاهي مع عروض مميزة',
        descEn: 'Discover the best restaurants and cafes with exclusive deals',
        icon: 'utensils',
        isActive: true,
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'beauty-spa' },
      update: {},
      create: {
        slug: 'beauty-spa',
        nameAr: 'الجمال والسبا',
        nameEn: 'Beauty & Spa',
        descAr: 'عروض على صالونات التجميل والسبا',
        descEn: 'Deals on beauty salons and spas',
        icon: 'sparkles',
        isActive: true,
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'hotels' },
      update: {},
      create: {
        slug: 'hotels',
        nameAr: 'فنادق',
        nameEn: 'Hotels',
        descAr: 'احجز غرفتك بأفضل الأسعار',
        descEn: 'Book your room at the best prices',
        icon: 'hotel',
        isActive: true,
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'activities' },
      update: {},
      create: {
        slug: 'activities',
        nameAr: 'الأنشطة',
        nameEn: 'Activities',
        descAr: 'أنشطة ترفيهية وتعليمية للعائلة',
        descEn: 'Fun and educational activities for the family',
        icon: 'party-popper',
        isActive: true,
        order: 4,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create hero banners
  const heroBanners = await Promise.all([
    prisma.banner.upsert({
      where: { id: 'hero-1' },
      update: {},
      create: {
        id: 'hero-1',
        titleAr: 'عروض حصرية في الرياض',
        titleEn: 'Exclusive Deals in Riyadh',
        subtitleAr: 'وفّر حتى 70% على أفضل المطاعم والأنشطة',
        subtitleEn: 'Save up to 70% on best restaurants and activities',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop',
        ctaTextAr: 'استكشف العروض',
        ctaTextEn: 'Explore Deals',
        ctaLink: '/?city=riyadh&sort=popular',
        placement: 'hero',
        status: 'PUBLISHED',
        priority: 1,
        cityTargets: [],
      },
    }),
    prisma.banner.upsert({
      where: { id: 'hero-2' },
      update: {},
      create: {
        id: 'hero-2',
        titleAr: 'اكتشف تجارب جديدة',
        titleEn: 'Discover New Experiences',
        subtitleAr: 'أفضل العروض على الجمال والسبا',
        subtitleEn: 'Best deals on beauty and spa',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&h=1080&fit=crop',
        ctaTextAr: 'تسوق الآن',
        ctaTextEn: 'Shop Now',
        ctaLink: '/?city=riyadh&category=beauty-spa',
        placement: 'hero',
        status: 'PUBLISHED',
        priority: 2,
        cityTargets: [],
      },
    }),
    prisma.banner.upsert({
      where: { id: 'hero-3' },
      update: {},
      create: {
        id: 'hero-3',
        titleAr: 'عطلة مميزة بانتظارك',
        titleEn: 'Your Perfect Getaway Awaits',
        subtitleAr: 'خصومات على أفضل الفنادق',
        subtitleEn: 'Discounts on top hotels',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop',
        ctaTextAr: 'احجز الآن',
        ctaTextEn: 'Book Now',
        ctaLink: '/?city=riyadh&category=hotels',
        placement: 'hero',
        status: 'PUBLISHED',
        priority: 3,
        cityTargets: [],
      },
    }),
  ]);

  console.log(`✅ Created ${heroBanners.length} hero banners`);

  // Create top banner
  await prisma.banner.upsert({
    where: { id: 'top-banner-1' },
    update: {},
    create: {
      id: 'top-banner-1',
      titleAr: 'عروض نهاية الأسبوع',
      titleEn: 'Weekend Specials',
      subtitleAr: 'خصومات إضافية على جميع الفئات',
      subtitleEn: 'Extra discounts on all categories',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop',
      ctaTextAr: 'تسوق الآن',
      ctaTextEn: 'Shop Now',
      ctaLink: '/?sort=discount',
      placement: 'top',
      status: 'PUBLISHED',
      priority: 1,
      cityTargets: [],
    },
  });

  console.log('✅ Created top banner');

  // Create mid-page banner
  await prisma.banner.upsert({
    where: { id: 'mid-banner-1' },
    update: {},
    create: {
      id: 'mid-banner-1',
      titleAr: 'انضم لبرنامج الولاء',
      titleEn: 'Join Our Loyalty Program',
      subtitleAr: 'اربح نقاط مع كل عملية شراء',
      subtitleEn: 'Earn points with every purchase',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&h=600&fit=crop',
      ctaTextAr: 'سجل الآن',
      ctaTextEn: 'Sign Up Now',
      ctaLink: '/auth/signin',
      placement: 'mid-page',
      status: 'PUBLISHED',
      priority: 1,
      cityTargets: [],
    },
  });

  console.log('✅ Created mid-page banner');

  console.log('\n🎉 Seeding completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Create some vendors and listings in the admin panel');
  console.log('2. Visit the homepage at http://localhost:3000/?city=riyadh');
  console.log('3. Make sure you have some listings with:');
  console.log('   - `endsAt` set within 48 hours for "Hot Now" section');
  console.log('   - `status` set to "LIVE"');
  console.log('   - `isActive` set to true');
  console.log('   - Assets (images) uploaded');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

