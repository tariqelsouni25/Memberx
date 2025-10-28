import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">اتصل بنا</h1>
          <p className="text-gray-600 mt-2">Contact Us</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>نموذج الاتصال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input id="name" placeholder="أدخل اسمك" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" placeholder="أدخل رقم هاتفك" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">الموضوع</Label>
                <Input id="subject" placeholder="موضوع الرسالة" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">الرسالة</Label>
                <Textarea id="message" rows={4} placeholder="أدخل رسالتك" />
              </div>
              <Button className="w-full">إرسال الرسالة</Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الاتصال</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">العنوان</h4>
                  <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                </div>
                <div>
                  <h4 className="font-semibold">الهاتف</h4>
                  <p className="text-gray-600">+966 11 123 4567</p>
                </div>
                <div>
                  <h4 className="font-semibold">البريد الإلكتروني</h4>
                  <p className="text-gray-600">info@memberx.com</p>
                </div>
                <div>
                  <h4 className="font-semibold">ساعات العمل</h4>
                  <p className="text-gray-600">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تابعنا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline">تويتر</Button>
                  <Button variant="outline">إنستغرام</Button>
                  <Button variant="outline">لينكد إن</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}