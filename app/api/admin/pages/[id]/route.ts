import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guards';
import { Permission } from '@/lib/admin/permissions';

// GET /api/admin/pages/[id] - Get single page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    // Mock data - replace with actual database query
    const page = {
      id,
      slug: 'home',
      titleAr: 'الصفحة الرئيسية',
      titleEn: 'Homepage',
      descriptionAr: 'وصف الصفحة الرئيسية بالعربية',
      descriptionEn: 'Homepage description in English',
      metaTitleAr: 'عنوان الصفحة الرئيسية',
      metaTitleEn: 'Homepage Title',
      metaDescriptionAr: 'وصف الصفحة الرئيسية لمحركات البحث',
      metaDescriptionEn: 'Homepage description for search engines',
      keywords: 'صفحة رئيسية, عروض, صفقات',
      type: 'homepage',
      status: 'published',
      showInMenu: true,
      allowComments: false,
      sections: 5,
      lastModified: '2024-01-15',
      modifiedBy: 'أحمد محمد',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    };

    return NextResponse.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/pages/[id] - Update page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const { titleAr, titleEn, slug, type, descriptionAr, descriptionEn, metaTitleAr, metaTitleEn, metaDescriptionAr, metaDescriptionEn, keywords, isPublished, showInMenu, allowComments } = body;

    // Validate required fields
    if (!titleAr || !titleEn || !slug) {
      return NextResponse.json(
        { success: false, error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    // Mock page update - replace with actual database operation
    const updatedPage = {
      id,
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
      sections: 5, // Keep existing sections count
      lastModified: new Date().toISOString().split('T')[0],
      modifiedBy: 'Current User', // Replace with actual user
      createdAt: '2024-01-01',
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: updatedPage,
      message: 'Page updated successfully'
    });
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/pages/[id] - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    // Mock page deletion - replace with actual database operation
    // Check if page has sections first
    const hasSections = true; // Mock check

    if (hasSections) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete page with sections. Delete sections first.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
