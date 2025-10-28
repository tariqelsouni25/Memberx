import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">من نحن</h1>
          <p className="text-gray-600 mt-2">About Us</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>عن الشركة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                نحن شركة رائدة في مجال العروض والصفقات في المملكة العربية السعودية. 
                نسعى لتقديم أفضل العروض والخدمات لعملائنا الكرام.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>رؤيتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                أن نكون المنصة الأولى للعروض والصفقات في المنطقة، 
                ونقدم تجربة استثنائية لعملائنا.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>مهمتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                ربط العملاء بأفضل العروض والصفقات من الشركاء الموثوقين، 
                وتوفير تجربة تسوق مميزة وآمنة.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
