import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { db } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Palette, Upload } from 'lucide-react';

async function getThemeSettings() {
  let theme = await db.themeSetting.findFirst();

  if (!theme) {
    theme = await db.themeSetting.create({
      data: {
        primaryColor: '#0066FF',
        accentColor: '#FF6B00',
        fontFamily: 'Cairo',
        borderRadius: 12,
        shadowEnabled: true,
      },
    });
  }

  return theme;
}

export default async function AdminThemePage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/auth/signin?callbackUrl=/admin/theme');
  }

  const theme = await getThemeSettings();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary mb-1 block">
                ← العودة للوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Palette className="w-6 h-6" />
                Theme & Branding
              </h1>
            </div>
            <Button>حفظ التغييرات</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Brand Assets */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>الشعار والأيقونات (Brand Assets)</CardTitle>
            <CardDescription>رفع شعار الموقع والأيقونات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="mb-2 block">Logo (Light Mode)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">اضغط للرفع</p>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Logo (Dark Mode)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">اضغط للرفع</p>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Favicon</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">اضغط للرفع</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>الألوان (Colors)</CardTitle>
            <CardDescription>تخصيص نظام الألوان للموقع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    defaultValue={theme.primaryColor}
                    className="w-20 h-10 cursor-pointer"
                  />
                  <Input type="text" defaultValue={theme.primaryColor} className="font-mono" />
                </div>
              </div>

              <div>
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="accentColor"
                    type="color"
                    defaultValue={theme.accentColor}
                    className="w-20 h-10 cursor-pointer"
                  />
                  <Input type="text" defaultValue={theme.accentColor} className="font-mono" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              💡 سيتم التحقق من التباين تلقائياً للتأكد من إمكانية القراءة
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>الخطوط (Typography)</CardTitle>
            <CardDescription>اختيار نمط الخطوط</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fontFamily">Font Family</Label>
              <select
                id="fontFamily"
                defaultValue={theme.fontFamily}
                className="w-full mt-2 h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="Cairo">Cairo (افتراضي)</option>
                <option value="Tajawal">Tajawal</option>
                <option value="IBM Plex Sans Arabic">IBM Plex Sans Arabic</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Design System */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>نظام التصميم (Design System)</CardTitle>
            <CardDescription>إعدادات التصميم العامة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="borderRadius">Border Radius (px)</Label>
              <div className="flex items-center gap-4 mt-2">
                <Input
                  id="borderRadius"
                  type="range"
                  min="0"
                  max="24"
                  step="2"
                  defaultValue={theme.borderRadius}
                  className="flex-1"
                />
                <span className="w-12 text-center font-mono">{theme.borderRadius}px</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Shadows</Label>
                <p className="text-sm text-muted-foreground">تفعيل الظلال على العناصر</p>
              </div>
              <Switch defaultChecked={theme.shadowEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Custom CSS */}
        <Card>
          <CardHeader>
            <CardTitle>Custom CSS (متقدم)</CardTitle>
            <CardDescription>إضافة CSS مخصص للموقع</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-48 rounded-md border border-input bg-background px-3 py-2 font-mono text-sm"
              placeholder="/* أضف CSS مخصص هنا */"
              defaultValue={theme.customCss || ''}
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline">إعادة تعيين</Button>
          <Button size="lg">حفظ التغييرات</Button>
        </div>
      </main>
    </div>
  );
}

