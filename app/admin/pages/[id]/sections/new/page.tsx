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

interface NewSectionProps {
  params: { id: string };
}

export default async function NewSectionPage({ params }: NewSectionProps) {
  await adminGuard([Permission.PAGES_EDIT]);

  // Mock page data
  const page = {
    id: params.id,
    titleAr: 'الصفحة الرئيسية',
    titleEn: 'Homepage',
    slug: 'home'
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">قسم جديد</h1>
              <p className="text-sm text-gray-600 mt-1">إضافة قسم جديد لصفحة: {page.titleAr}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href={`/admin/pages/${page.id}/sections`}>
                  <ArrowRight className="w-4 h-4 ml-2" />
                  العودة للأقسام
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Section Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>نوع القسم</CardTitle>
              <CardDescription>
                اختر نوع القسم الذي تريد إضافته
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sectionType">نوع القسم *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero Banner - بانر رئيسي</SelectItem>
                    <SelectItem value="deals">Deals Section - قسم العروض</SelectItem>
                    <SelectItem value="categories">Categories - الفئات</SelectItem>
                    <SelectItem value="testimonials">Testimonials - الشهادات</SelectItem>
                    <SelectItem value="text">Text Content - محتوى نصي</SelectItem>
                    <SelectItem value="gallery">Image Gallery - معرض صور</SelectItem>
                    <SelectItem value="contact">Contact Form - نموذج اتصال</SelectItem>
                    <SelectItem value="newsletter">Newsletter - النشرة الإخبارية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
              <CardDescription>
                أدخل المعلومات الأساسية للقسم
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="titleAr">العنوان بالعربية *</Label>
                  <Input 
                    id="titleAr" 
                    placeholder="أدخل عنوان القسم بالعربية"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleEn">العنوان بالإنجليزية *</Label>
                  <Input 
                    id="titleEn" 
                    placeholder="Enter section title in English"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionAr">الوصف بالعربية</Label>
                <Textarea 
                  id="descriptionAr" 
                  placeholder="أدخل وصف القسم بالعربية"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionEn">الوصف بالإنجليزية</Label>
                <Textarea 
                  id="descriptionEn" 
                  placeholder="Enter section description in English"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="order">ترتيب القسم</Label>
                  <Input 
                    id="order" 
                    type="number"
                    placeholder="1"
                    min="1"
                  />
                  <p className="text-xs text-gray-500">ترتيب ظهور القسم في الصفحة</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cssClass">CSS Class</Label>
                  <Input 
                    id="cssClass" 
                    placeholder="custom-section-class"
                  />
                  <p className="text-xs text-gray-500">فئة CSS مخصصة للقسم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Settings */}
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المحتوى</CardTitle>
              <CardDescription>
                إعدادات خاصة بنوع القسم
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contentAr">المحتوى بالعربية</Label>
                <Textarea 
                  id="contentAr" 
                  placeholder="أدخل محتوى القسم بالعربية"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentEn">المحتوى بالإنجليزية</Label>
                <Textarea 
                  id="contentEn" 
                  placeholder="Enter section content in English"
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">لون الخلفية</Label>
                  <Input 
                    id="backgroundColor" 
                    type="color"
                    defaultValue="#ffffff"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textColor">لون النص</Label>
                  <Input 
                    id="textColor" 
                    type="color"
                    defaultValue="#000000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle>إعدادات العرض</CardTitle>
              <CardDescription>
                إعدادات عرض القسم
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تفعيل القسم</Label>
                  <p className="text-sm text-gray-500">جعل القسم مرئي في الصفحة</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إظهار العنوان</Label>
                  <p className="text-sm text-gray-500">إظهار عنوان القسم</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إظهار الوصف</Label>
                  <p className="text-sm text-gray-500">إظهار وصف القسم</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="paddingTop">Padding Top (px)</Label>
                  <Input 
                    id="paddingTop" 
                    type="number"
                    placeholder="20"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paddingBottom">Padding Bottom (px)</Label>
                  <Input 
                    id="paddingBottom" 
                    type="number"
                    placeholder="20"
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href={`/admin/pages/${page.id}/sections`}>
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
                إضافة القسم
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
