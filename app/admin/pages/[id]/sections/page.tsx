import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowRight,
  Settings,
  Calendar,
  User,
  GripVertical
} from 'lucide-react';
import Link from 'next/link';
import { adminGuard } from '@/lib/admin/guards';
import { Permission } from '@/lib/admin/permissions';

interface PageSectionsProps {
  params: Promise<{ id: string }>;
}

// Mock sections data
const mockSections = [
  {
    id: '1',
    pageId: '1',
    titleAr: 'قسم البانر الرئيسي',
    titleEn: 'Hero Banner Section',
    type: 'hero',
    order: 1,
    isActive: true,
    lastModified: '2024-01-15',
    modifiedBy: 'أحمد محمد'
  },
  {
    id: '2',
    pageId: '1',
    titleAr: 'قسم العروض المميزة',
    titleEn: 'Featured Deals Section',
    type: 'deals',
    order: 2,
    isActive: true,
    lastModified: '2024-01-14',
    modifiedBy: 'فاطمة أحمد'
  },
  {
    id: '3',
    pageId: '1',
    titleAr: 'قسم الفئات',
    titleEn: 'Categories Section',
    type: 'categories',
    order: 3,
    isActive: true,
    lastModified: '2024-01-13',
    modifiedBy: 'محمد علي'
  },
  {
    id: '4',
    pageId: '1',
    titleAr: 'قسم الشهادات',
    titleEn: 'Testimonials Section',
    type: 'testimonials',
    order: 4,
    isActive: false,
    lastModified: '2024-01-12',
    modifiedBy: 'سارة أحمد'
  },
  {
    id: '5',
    pageId: '1',
    titleAr: 'قسم التذييل',
    titleEn: 'Footer Section',
    type: 'footer',
    order: 5,
    isActive: true,
    lastModified: '2024-01-11',
    modifiedBy: 'خالد محمد'
  }
];

export default async function PageSectionsPage({ params }: PageSectionsProps) {
  await adminGuard([Permission.PAGES_EDIT]);

  const { id } = await params;

  // Mock page data
  const page = {
    id,
    titleAr: 'الصفحة الرئيسية',
    titleEn: 'Homepage',
    slug: 'home'
  };

  const sections = mockSections.filter(section => section.pageId === id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">إدارة أقسام الصفحة</h1>
              <p className="text-sm text-gray-600 mt-1">إدارة أقسام صفحة: {page.titleAr}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild>
                <Link href={`/admin/pages/${page.id}/sections/new`}>
                  <Plus className="w-4 h-4 ml-2" />
                  قسم جديد
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/pages">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  العودة للصفحات
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{page.titleAr}</h2>
                  <p className="text-sm text-gray-600">{page.titleEn}</p>
                  <p className="text-xs text-gray-500 mt-1">الرابط: /{page.slug}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">إجمالي الأقسام</p>
                  <p className="text-2xl font-bold text-primary">{sections.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    placeholder="البحث في الأقسام..." 
                    className="pr-10"
                  />
                </div>
                <Button variant="outline">فلترة</Button>
                <Button variant="outline">ترتيب</Button>
              </div>
            </CardContent>
          </Card>

          {/* Sections List */}
          <div className="space-y-4">
            {sections.map((section) => (
              <Card key={section.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="cursor-move">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{section.titleAr}</h3>
                          <Badge variant={section.isActive ? 'default' : 'secondary'}>
                            {section.isActive ? 'نشط' : 'غير نشط'}
                          </Badge>
                          <Badge variant="outline">{section.type}</Badge>
                          <Badge variant="outline">ترتيب: {section.order}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{section.titleEn}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {section.lastModified}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {section.modifiedBy}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/pages/${page.id}/sections/${section.id}/edit`}>
                          <Edit className="w-4 h-4 ml-1" />
                          تعديل
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/${page.slug}#section-${section.id}`} target="_blank">
                          <Eye className="w-4 h-4 ml-1" />
                          معاينة
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {sections.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد أقسام</h3>
                <p className="text-gray-600 mb-6">لم يتم إضافة أي أقسام لهذه الصفحة بعد</p>
                <Button asChild>
                  <Link href={`/admin/pages/${page.id}/sections/new`}>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة قسم جديد
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Section Types Info */}
          <Card>
            <CardHeader>
              <CardTitle>أنواع الأقسام المتاحة</CardTitle>
              <CardDescription>
                أنواع الأقسام التي يمكن إضافتها للصفحة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Hero Banner</h4>
                  <p className="text-sm text-gray-600">بانر رئيسي مع صورة وعنوان</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Deals Section</h4>
                  <p className="text-sm text-gray-600">عرض العروض والصفقات</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Categories</h4>
                  <p className="text-sm text-gray-600">عرض الفئات المختلفة</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Testimonials</h4>
                  <p className="text-sm text-gray-600">شهادات العملاء</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Text Content</h4>
                  <p className="text-sm text-gray-600">محتوى نصي عادي</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Image Gallery</h4>
                  <p className="text-sm text-gray-600">معرض صور</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
