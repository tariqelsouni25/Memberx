import { db } from '@/lib/db';

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://memberx.com';

  // Handle missing database during build - return minimal sitemap
  let cities: any[] = [];
  let categories: any[] = [];
  let listings: any[] = [];

  if (db) {
    try {
      [cities, categories, listings] = await Promise.all([
        db.city.findMany({ where: { isActive: true } }),
        db.category.findMany({ where: { isActive: true } }),
        db.listing.findMany({
          where: { isActive: true, status: 'LIVE' },
          select: { slug: true, updatedAt: true },
        }),
      ]);
    } catch (error) {
      console.warn('Failed to fetch data for sitemap. Returning static pages only:', error);
      // Continue with empty arrays
    }
  }

  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/terms', changefreq: 'monthly', priority: 0.5 },
    { url: '/privacy', changefreq: 'monthly', priority: 0.5 },
    { url: '/refunds', changefreq: 'monthly', priority: 0.5 },
    { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  ];

  const cityPages = cities.map((city) => ({
    url: `/deals/${city.slug}`,
    changefreq: 'daily',
    priority: 0.9,
  }));

  const categoryPages: any[] = [];
  cities.forEach((city) => {
    categories.forEach((category) => {
      categoryPages.push({
        url: `/deals/${city.slug}/${category.slug}`,
        changefreq: 'daily',
        priority: 0.8,
      });
    });
  });

  const dealPages = listings.map((listing) => ({
    url: `/deal/${listing.slug}`,
    lastmod: listing.updatedAt.toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...cityPages, ...categoryPages, ...dealPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

