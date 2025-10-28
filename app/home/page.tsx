import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">الصفحة الرئيسية</h1>
          <p className="text-gray-600 mt-2">Homepage</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>قسم البانر الرئيسي</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">هذا قسم البانر الرئيسي للصفحة الرئيسية</p>
            </CardContent>
          </Card>

          {/* Featured Deals Section */}
          <Card>
            <CardHeader>
              <CardTitle>قسم العروض المميزة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">هذا قسم العروض المميزة</p>
            </CardContent>
          </Card>

          {/* Categories Section */}
          <Card>
            <CardHeader>
              <CardTitle>قسم الفئات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">هذا قسم الفئات المختلفة</p>
            </CardContent>
          </Card>

          {/* Testimonials Section */}
          <Card>
            <CardHeader>
              <CardTitle>قسم الشهادات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">هذا قسم شهادات العملاء</p>
            </CardContent>
          </Card>

          {/* Footer Section */}
          <Card>
            <CardHeader>
              <CardTitle>قسم التذييل</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">هذا قسم التذييل</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
