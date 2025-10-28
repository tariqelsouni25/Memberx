import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean database (optional - comment out if you want to keep existing data)
  await prisma.redemptionAttempt.deleteMany();
  await prisma.voucher.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.slotHold.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.slotRule.deleteMany();
  await prisma.listingFaq.deleteMany();
  await prisma.listingTerm.deleteMany();
  await prisma.listingAsset.deleteMany();
  await prisma.listingVariant.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.category.deleteMany();
  await prisma.city.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.navigationItem.deleteMany();
  await prisma.pageSection.deleteMany();
  await prisma.page.deleteMany();
  await prisma.seoMeta.deleteMany();
  await prisma.translation.deleteMany();
  await prisma.themeSetting.deleteMany();
  await prisma.featureFlag.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.version.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  console.log('👥 Creating users...');
  const adminPassword = await hash('admin123', 12);
  const editorPassword = await hash('editor123', 12);
  const partnerPassword = await hash('partner123', 12);
  const userPassword = await hash('user123', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@demo.local',
      name: 'مدير النظام',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  const editor = await prisma.user.create({
    data: {
      email: 'editor@demo.local',
      name: 'محرر المحتوى',
      password: editorPassword,
      role: 'CONTENT_EDITOR',
      emailVerified: new Date(),
    },
  });

  const partnerUser = await prisma.user.create({
    data: {
      email: 'partner@demo.local',
      name: 'شريك تجاري',
      password: partnerPassword,
      role: 'PARTNER',
      emailVerified: new Date(),
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      email: 'user@demo.local',
      name: 'مستخدم عادي',
      password: userPassword,
      role: 'USER',
      emailVerified: new Date(),
    },
  });

  // Create Cities
  console.log('🏙️ Creating cities...');
  const riyadh = await prisma.city.create({
    data: {
      slug: 'riyadh',
      nameAr: 'الرياض',
      nameEn: 'Riyadh',
      isActive: true,
      order: 1,
    },
  });

  const jeddah = await prisma.city.create({
    data: {
      slug: 'jeddah',
      nameAr: 'جدة',
      nameEn: 'Jeddah',
      isActive: true,
      order: 2,
    },
  });

  const dammam = await prisma.city.create({
    data: {
      slug: 'dammam',
      nameAr: 'الدمام',
      nameEn: 'Dammam',
      isActive: true,
      order: 3,
    },
  });

  // Create Categories
  console.log('📂 Creating categories...');
  const foodDining = await prisma.category.create({
    data: {
      slug: 'food-dining',
      nameAr: 'المطاعم والطعام',
      nameEn: 'Food & Dining',
      descAr: 'اكتشف أفضل المطاعم والمقاهي مع عروض حصرية',
      descEn: 'Discover the best restaurants and cafes with exclusive offers',
      icon: '🍽️',
      isActive: true,
      order: 1,
    },
  });

  const beautySpa = await prisma.category.create({
    data: {
      slug: 'beauty-spa',
      nameAr: 'التجميل والمنتجعات',
      nameEn: 'Beauty & Spa',
      descAr: 'عروض على خدمات التجميل والعناية والمنتجعات الصحية',
      descEn: 'Deals on beauty services, wellness, and spa treatments',
      icon: '💆',
      isActive: true,
      order: 2,
    },
  });

  const hotels = await prisma.category.create({
    data: {
      slug: 'hotels',
      nameAr: 'الفنادق',
      nameEn: 'Hotels',
      descAr: 'احجز إقامتك في أفضل الفنادق بأسعار مميزة',
      descEn: 'Book your stay at the best hotels with special prices',
      icon: '🏨',
      isActive: true,
      order: 3,
    },
  });

  const activities = await prisma.category.create({
    data: {
      slug: 'activities',
      nameAr: 'الأنشطة',
      nameEn: 'Activities',
      descAr: 'استمتع بأنشطة ترفيهية ورياضية متنوعة',
      descEn: 'Enjoy diverse entertainment and sports activities',
      icon: '🎯',
      isActive: true,
      order: 4,
    },
  });

  const travel = await prisma.category.create({
    data: {
      slug: 'travel',
      nameAr: 'السفر والسياحة',
      nameEn: 'Travel & Tourism',
      descAr: 'باقات سفر عالمية شاملة للطيران والفنادق من السعودية',
      descEn: 'Global travel packages including flights and hotels from Saudi Arabia',
      icon: '✈️',
      isActive: true,
      order: 5,
    },
  });

  const health = await prisma.category.create({
    data: {
      slug: 'health',
      nameAr: 'الصحة والعافية',
      nameEn: 'Health & Wellness',
      descAr: 'خدمات صحية ورياضية ومراكز عناية بالصحة والعافية',
      descEn: 'Health, fitness and wellness services and care centers',
      icon: '🏥',
      isActive: true,
      order: 6,
    },
  });

  const services = await prisma.category.create({
    data: {
      slug: 'services',
      nameAr: 'الخدمات',
      nameEn: 'Services',
      descAr: 'خدمات منزلية ومهنية وصيانة وإصلاح وخدمات متنوعة',
      descEn: 'Home, professional, maintenance, repair and various services',
      icon: '🔧',
      isActive: true,
      order: 7,
    },
  });

  // Create Vendors
  console.log('🏪 Creating vendors...');
  const vendor1 = await prisma.vendor.create({
    data: {
      slug: 'al-nakheel-restaurant',
      nameAr: 'مطعم النخيل',
      nameEn: 'Al Nakheel Restaurant',
      descAr: 'مطعم فاخر يقدم أشهى المأكولات العربية والعالمية',
      descEn: 'Luxury restaurant serving the finest Arabic and international cuisines',
      logo: 'https://res.cloudinary.com/demo/image/upload/v1/restaurant-logo.jpg',
      phone: '+966112345678',
      email: 'info@alnakheel.sa',
      isActive: true,
      managerId: partnerUser.id,
      addressAr: 'طريق الملك فهد، الرياض',
      addressEn: 'King Fahd Road, Riyadh',
      latitude: 24.7136,
      longitude: 46.6753,
    },
  });

  const vendor2 = await prisma.vendor.create({
    data: {
      slug: 'beauty-lounge',
      nameAr: 'صالون الجمال',
      nameEn: 'Beauty Lounge',
      descAr: 'صالون نسائي متخصص في العناية بالبشرة والشعر',
      descEn: 'Ladies salon specializing in skincare and hair care',
      logo: 'https://res.cloudinary.com/demo/image/upload/v1/salon-logo.jpg',
      phone: '+966112345679',
      email: 'info@beautylounge.sa',
      isActive: true,
      addressAr: 'حي العليا، الرياض',
      addressEn: 'Olaya District, Riyadh',
    },
  });

  const vendor3 = await prisma.vendor.create({
    data: {
      slug: 'royal-hotel',
      nameAr: 'فندق رويال',
      nameEn: 'Royal Hotel',
      descAr: 'فندق خمس نجوم في قلب المدينة',
      descEn: 'Five-star hotel in the heart of the city',
      logo: 'https://res.cloudinary.com/demo/image/upload/v1/hotel-logo.jpg',
      phone: '+966112345680',
      email: 'reservations@royalhotel.sa',
      isActive: true,
      addressAr: 'طريق العروبة، جدة',
      addressEn: 'Al Urubah Road, Jeddah',
    },
  });

  // Create Listings
  console.log('📦 Creating listings...');
  const listing1 = await prisma.listing.create({
    data: {
      slug: 'luxury-dinner-for-two',
      titleAr: 'عشاء فاخر لشخصين',
      titleEn: 'Luxury Dinner for Two',
      subtitleAr: 'تجربة طعام لا تُنسى',
      subtitleEn: 'An unforgettable dining experience',
      descAr: 'استمتع بعشاء رومانسي فاخر لشخصين في مطعم النخيل. يشمل العرض مقبلات، طبق رئيسي، حلى، ومشروبات.',
      descEn: 'Enjoy a romantic luxury dinner for two at Al Nakheel Restaurant. Includes appetizers, main course, dessert, and beverages.',
      cityId: riyadh.id,
      categoryId: foodDining.id,
      vendorId: vendor1.id,
      priceOriginal: 500,
      priceSale: 299,
      discountPct: 40,
      currency: 'SAR',
      status: 'LIVE',
      badges: ['HOT', 'BEST_SELLER'],
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      stock: 50,
      maxPerUser: 2,
      highlightsAr: [
        'مقبلات متنوعة',
        'طبق رئيسي فاخر',
        'حلى من اختيار الشيف',
        'مشروبات مجانية',
        'إطلالة رائعة',
      ],
      highlightsEn: [
        'Variety of appetizers',
        'Premium main course',
        "Chef's selection dessert",
        'Complimentary beverages',
        'Stunning view',
      ],
      termsAr: 'يجب الحجز قبل 24 ساعة. غير قابل للاسترداد.',
      termsEn: 'Booking required 24 hours in advance. Non-refundable.',
      bookingEnabled: true,
      requiresSlot: true,
      isActive: true,
      isFeatured: true,
      publishedAt: new Date(),
      assets: {
        create: [
          {
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
            altAr: 'عشاء فاخر',
            altEn: 'Luxury Dinner',
            order: 0,
          },
        ],
      },
      variants: {
        create: [
          {
            nameAr: 'عشاء يوم الأسبوع',
            nameEn: 'Weekday Dinner',
            priceAdjust: 0,
            order: 0,
            isActive: true,
          },
          {
            nameAr: 'عشاء عطلة نهاية الأسبوع',
            nameEn: 'Weekend Dinner',
            priceAdjust: 50,
            order: 1,
            isActive: true,
          },
        ],
      },
      terms: {
        create: [
          {
            contentAr: 'صالح لمدة 60 يوماً من تاريخ الشراء',
            contentEn: 'Valid for 60 days from purchase date',
            order: 0,
          },
          {
            contentAr: 'يجب الحجز المسبق قبل 24 ساعة',
            contentEn: 'Prior booking required 24 hours in advance',
            order: 1,
          },
        ],
      },
      faqs: {
        create: [
          {
            questionAr: 'هل يمكنني تغيير موعد الحجز؟',
            questionEn: 'Can I change my reservation?',
            answerAr: 'نعم، يمكنك تغيير الموعد قبل 24 ساعة من الحجز الأصلي',
            answerEn: 'Yes, you can change the date 24 hours before the original booking',
            order: 0,
          },
        ],
      },
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      slug: 'spa-day-package',
      titleAr: 'باقة يوم كامل في المنتجع الصحي',
      titleEn: 'Full Day Spa Package',
      subtitleAr: 'استرخاء وتدليل',
      subtitleEn: 'Relaxation and Pampering',
      descAr: 'يوم كامل من الاسترخاء يشمل مساج، عناية بالبشرة، وعلاجات تجميلية',
      descEn: 'Full day of relaxation including massage, facial, and beauty treatments',
      cityId: riyadh.id,
      categoryId: beautySpa.id,
      vendorId: vendor2.id,
      priceOriginal: 800,
      priceSale: 499,
      discountPct: 38,
      status: 'LIVE',
      badges: ['FLASH'],
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      highlightsAr: ['مساج للجسم', 'عناية بالوجه', 'مانيكير وباديكير', 'حمام مغربي'],
      highlightsEn: ['Body massage', 'Facial treatment', 'Manicure & Pedicure', 'Moroccan bath'],
      bookingEnabled: true,
      requiresSlot: true,
      isActive: true,
      publishedAt: new Date(),
      assets: {
        create: [
          {
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
            altAr: 'منتجع صحي',
            altEn: 'Spa',
            order: 0,
          },
        ],
      },
    },
  });

  const listing3 = await prisma.listing.create({
    data: {
      slug: 'hotel-staycation-jeddah',
      titleAr: 'إقامة فندقية لليلتين في جدة',
      titleEn: 'Two Night Hotel Stay in Jeddah',
      descAr: 'إقامة فندقية فاخرة لشخصين تشمل الإفطار والوصول للمرافق',
      descEn: 'Luxury hotel stay for two including breakfast and facilities access',
      cityId: jeddah.id,
      categoryId: hotels.id,
      vendorId: vendor3.id,
      priceOriginal: 1200,
      priceSale: 799,
      discountPct: 33,
      status: 'LIVE',
      badges: ['NEW'],
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      highlightsAr: ['إفطار مجاني', 'واي فاي مجاني', 'مسبح', 'جيم', 'إطلالة على البحر'],
      highlightsEn: ['Free breakfast', 'Free WiFi', 'Pool', 'Gym', 'Sea view'],
      bookingEnabled: true,
      requiresSlot: false,
      isActive: true,
      publishedAt: new Date(),
      assets: {
        create: [
          {
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
            altAr: 'فندق',
            altEn: 'Hotel',
            order: 0,
          },
        ],
      },
    },
  });

  // Create Slot Rules for listings that require booking
  console.log('⏰ Creating slot rules...');
  const slotRule1 = await prisma.slotRule.create({
    data: {
      listingId: listing1.id,
      nameAr: 'العشاء - أيام الأسبوع',
      nameEn: 'Dinner - Weekdays',
      daysOfWeek: [0, 1, 2, 3, 4], // Sun-Thu
      startTime: '18:00',
      endTime: '23:00',
      intervalMinutes: 30,
      capacity: 5,
      effectiveFrom: new Date(),
      effectiveUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  });

  // Generate time slots for the next 30 days
  console.log('📅 Generating time slots...');
  const now = new Date();
  for (let day = 0; day < 30; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() + day);
    const dayOfWeek = date.getDay();

    if ([0, 1, 2, 3, 4].includes(dayOfWeek)) {
      // Weekdays
      const hours = [18, 19, 20, 21, 22]; // 6 PM to 10 PM
      for (const hour of hours) {
        for (const minute of [0, 30]) {
          const slotStart = new Date(date);
          slotStart.setHours(hour, minute, 0, 0);
          const slotEnd = new Date(slotStart);
          slotEnd.setMinutes(slotEnd.getMinutes() + 30);

          await prisma.timeSlot.create({
            data: {
              ruleId: slotRule1.id,
              startsAt: slotStart,
              endsAt: slotEnd,
              capacity: 5,
              booked: 0,
              blocked: false,
            },
          });
        }
      }
    }
  }

  // Create Banners
  console.log('🎨 Creating banners...');
  await prisma.banner.create({
    data: {
      titleAr: 'عروض رمضان الحصرية',
      titleEn: 'Exclusive Ramadan Offers',
      subtitleAr: 'خصومات تصل إلى 50%',
      subtitleEn: 'Discounts up to 50%',
      imageUrl: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=1200',
      ctaTextAr: 'تسوق الآن',
      ctaTextEn: 'Shop Now',
      ctaLink: '/deals/riyadh',
      cityTargets: [],
      placement: 'hero',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      priority: 1,
    },
  });

  // Create Theme Setting
  console.log('🎨 Creating theme settings...');
  await prisma.themeSetting.create({
    data: {
      primaryColor: '#0066FF',
      accentColor: '#FF6B00',
      fontFamily: 'Cairo',
      borderRadius: 12,
      shadowEnabled: true,
    },
  });

  // Create Feature Flags
  console.log('🚩 Creating feature flags...');
  await prisma.featureFlag.create({
    data: {
      key: 'show_hot_now_section',
      enabled: true,
      description: 'Show Hot Now section on homepage',
    },
  });

  await prisma.featureFlag.create({
    data: {
      key: 'enable_reviews',
      enabled: true,
      description: 'Enable review functionality',
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('\n📧 Test Accounts:');
  console.log('Admin: admin@demo.local / admin123');
  console.log('Editor: editor@demo.local / editor123');
  console.log('Partner: partner@demo.local / partner123');
  console.log('User: user@demo.local / user123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

