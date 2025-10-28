import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guards';
import { Permission } from '@/lib/admin/permissions';

// GET /api/admin/pages - List all pages
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    // Mock data - replace with actual database query
    const pages = [
      {
        id: '1',
        slug: 'home',
        titleAr: 'الصفحة الرئيسية',
        titleEn: 'Homepage',
        status: 'published',
        type: 'homepage',
        sections: 5,
        lastModified: '2024-01-15',
        modifiedBy: 'أحمد محمد'
      },
      {
        id: '2',
        slug: 'about',
        titleAr: 'من نحن',
        titleEn: 'About Us',
        status: 'published',
        type: 'static',
        sections: 3,
        lastModified: '2024-01-10',
        modifiedBy: 'فاطمة أحمد'
      },
      {
        id: '3',
        slug: 'contact',
        titleAr: 'اتصل بنا',
        titleEn: 'Contact Us',
        status: 'draft',
        type: 'static',
        sections: 2,
        lastModified: '2024-01-12',
        modifiedBy: 'محمد علي'
      }
    ];

    return NextResponse.json({
      success: true,
      data: pages,
      total: pages.length
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

// POST /api/admin/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { titleAr, titleEn, slug, type, descriptionAr, descriptionEn, metaTitleAr, metaTitleEn, metaDescriptionAr, metaDescriptionEn, keywords, isPublished, showInMenu, allowComments } = body;

    // Validate required fields
    if (!titleAr || !titleEn || !slug) {
      return NextResponse.json(
        { success: false, error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    // Mock page creation - replace with actual database operation
    const newPage = {
      id: Date.now().toString(),
      slug,
      titleAr,
      titleEn,
      descriptionAr: descriptionAr || '',
      descriptionEn: descriptionEn || '',
      metaTitleAr: metaTitleAr || titleAr,
      metaTitleEn: metaTitleEn || titleEn,
      metaDescriptionAr: metaDescriptionAr || descriptionAr || '',
      metaDescriptionEn: metaDescriptionEn || descriptionEn || '',
      keywords: keywords || '',
      type: type || 'static',
      status: isPublished ? 'published' : 'draft',
      showInMenu: showInMenu || false,
      allowComments: allowComments || false,
      sections: 0,
      lastModified: new Date().toISOString().split('T')[0],
      modifiedBy: 'Current User', // Replace with actual user
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newPage,
      message: 'Page created successfully'
    });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
