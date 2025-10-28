import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { adminGuard } from '@/lib/admin/guards';
import { Permission } from '@/lib/admin/permissions';

interface EditPageProps {
  params: { id: string };
}

export default async function EditPagePage({ params }: EditPageProps) {
  await adminGuard([Permission.PAGES_EDIT]);

  // Mock page data - replace with actual database query
  const page = {
    id: params.id,
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
    allowComments: false
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">تعديل الصفحة</h1>
              <p className="text-sm text-gray-600 mt-1">تعديل صفحة: {page.titleAr}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/admin/pages">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  العودة للقائمة
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
              <CardDescription>
                تعديل المعلومات الأساسية للصفحة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="titleAr">العنوان بالعربية *</Label>
                  <Input 
                    id="titleAr" 
                    defaultValue={page.titleAr}
                    placeholder="أدخل العنوان بالعربية"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleEn">العنوان بالإنجليزية *</Label>
                  <Input 
                    id="titleEn" 
                    defaultValue={page.titleEn}
                    placeholder="Enter title in English"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="slug">الرابط (Slug) *</Label>
                  <Input 
                    id="slug" 
                    defaultValue={page.slug}
                    placeholder="page-slug"
                    required
                  />
                  <p className="text-xs text-gray-500">سيتم الوصول للصفحة عبر: /page-slug</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">نوع الصفحة</Label>
                  <Select defaultValue={page.type}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الصفحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">صفحة ثابتة</SelectItem>
                      <SelectItem value="homepage">الصفحة الرئيسية</SelectItem>
                      <SelectItem value="category">صفحة فئة</SelectItem>
                      <SelectItem value="landing">صفحة هبوط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionAr">الوصف بالعربية</Label>
                <Textarea 
                  id="descriptionAr" 
                  defaultValue={page.descriptionAr}
                  placeholder="أدخل وصف الصفحة بالعربية"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionEn">الوصف بالإنجليزية</Label>
                <Textarea 
                  id="descriptionEn" 
                  defaultValue={page.descriptionEn}
                  placeholder="Enter page description in English"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>إعدادات SEO</CardTitle>
              <CardDescription>
                تحسين محركات البحث للصفحة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="metaTitleAr">عنوان Meta بالعربية</Label>
                  <Input 
                    id="metaTitleAr" 
                    defaultValue={page.metaTitleAr}
                    placeholder="عنوان الصفحة لمحركات البحث"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaTitleEn">عنوان Meta بالإنجليزية</Label>
                  <Input 
                    id="metaTitleEn" 
                    defaultValue={page.metaTitleEn}
                    placeholder="Page title for search engines"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="metaDescriptionAr">وصف Meta بالعربية</Label>
                  <Textarea 
                    id="metaDescriptionAr" 
                    defaultValue={page.metaDescriptionAr}
                    placeholder="وصف الصفحة لمحركات البحث"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescriptionEn">وصف Meta بالإنجليزية</Label>
                  <Textarea 
                    id="metaDescriptionEn" 
                    defaultValue={page.metaDescriptionEn}
                    placeholder="Page description for search engines"
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">الكلمات المفتاحية</Label>
                <Input 
                  id="keywords" 
                  defaultValue={page.keywords}
                  placeholder="كلمة1, كلمة2, كلمة3"
                />
                <p className="text-xs text-gray-500">افصل الكلمات بفواصل</p>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات</CardTitle>
              <CardDescription>
                إعدادات إضافية للصفحة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>نشر الصفحة</Label>
                  <p className="text-sm text-gray-500">جعل الصفحة مرئية للزوار</p>
                </div>
                <Switch defaultChecked={page.status === 'published'} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إظهار في القائمة</Label>
                  <p className="text-sm text-gray-500">إضافة الصفحة لقائمة التنقل</p>
                </div>
                <Switch defaultChecked={page.showInMenu} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>السماح بالتعليقات</Label>
                  <p className="text-sm text-gray-500">السماح للزوار بالتعليق على الصفحة</p>
                </div>
                <Switch defaultChecked={page.allowComments} />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/admin/pages">
                إلغاء
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Eye className="w-4 h-4 ml-2" />
                معاينة
              </Button>
              <Button>
                <Save className="w-4 h-4 ml-2" />
                حفظ كمسودة
              </Button>
              <Button>
                <Save className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
