import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Globe, 
  FileText,
  Settings,
  Calendar,
  User
} from 'lucide-react';
import Link from 'next/link';
import { adminGuard } from '@/lib/admin/guards';
import { Permission } from '@/lib/admin/permissions';

// Mock data for demonstration
const mockPages = [
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

const mockSections = [
  {
    id: '1',
    pageId: '1',
    titleAr: 'قسم البانر الرئيسي',
    titleEn: 'Hero Banner Section',
    type: 'hero',
    order: 1,
    isActive: true
  },
  {
    id: '2',
    pageId: '1',
    titleAr: 'قسم العروض المميزة',
    titleEn: 'Featured Deals Section',
    type: 'deals',
    order: 2,
    isActive: true
  },
  {
    id: '3',
    pageId: '1',
    titleAr: 'قسم الفئات',
    titleEn: 'Categories Section',
    type: 'categories',
    order: 3,
    isActive: true
  }
];

export default async function AdminPagesPage() {
  await adminGuard([Permission.PAGES_VIEW]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">إدارة الصفحات والأقسام</h1>
              <p className="text-sm text-gray-600 mt-1">إدارة محتوى الموقع والصفحات الثابتة</p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild>
                <Link href="/admin/pages/new">
                  <Plus className="w-4 h-4 ml-2" />
                  صفحة جديدة
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              الصفحات
            </TabsTrigger>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              الأقسام
            </TabsTrigger>
          </TabsList>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="البحث في الصفحات..." 
                      className="pr-10"
                    />
                  </div>
                  <Button variant="outline">فلترة</Button>
                </div>
              </CardContent>
            </Card>

            {/* Pages List */}
            <div className="grid gap-4">
              {mockPages.map((page) => (
                <Card key={page.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{page.titleAr}</h3>
                          <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                            {page.status === 'published' ? 'منشور' : 'مسودة'}
                          </Badge>
                          <Badge variant="outline">{page.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{page.titleEn}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {page.sections} أقسام
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {page.lastModified}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {page.modifiedBy}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/pages/${page.id}/sections`}>
                            <Settings className="w-4 h-4 ml-1" />
                            الأقسام
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/pages/${page.id}/edit`}>
                            <Edit className="w-4 h-4 ml-1" />
                            تعديل
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/${page.slug}`} target="_blank">
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
          </TabsContent>

          {/* Sections Tab */}
          <TabsContent value="sections" className="space-y-6">
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
                </div>
              </CardContent>
            </Card>

            {/* Sections List */}
            <div className="grid gap-4">
              {mockSections.map((section) => (
                <Card key={section.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{section.titleAr}</h3>
                          <Badge variant={section.isActive ? 'default' : 'secondary'}>
                            {section.isActive ? 'نشط' : 'غير نشط'}
                          </Badge>
                          <Badge variant="outline">{section.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{section.titleEn}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>ترتيب: {section.order}</span>
                          <span>الصفحة: {section.pageId}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/pages/sections/${section.id}/edit`}>
                            <Edit className="w-4 h-4 ml-1" />
                            تعديل
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
