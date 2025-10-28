import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth.config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string; lang?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await auth();
  const { callbackUrl = '/', lang = 'ar' } = await searchParams;

  if (session) {
    redirect(callbackUrl);
  }

  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Member X
          </div>
          <CardTitle>{isAr ? 'تسجيل الدخول' : 'Sign In'}</CardTitle>
          <CardDescription>
            {isAr ? 'أدخل بياناتك للدخول إلى حسابك' : 'Enter your credentials to access your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              'use server';
              await signIn('credentials', {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                redirectTo: callbackUrl,
              });
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="email">{isAr ? 'البريد الإلكتروني' : 'Email'}</Label>
              <Input id="email" name="email" type="email" placeholder="user@example.com" required />
            </div>
            <div>
              <Label htmlFor="password">{isAr ? 'كلمة المرور' : 'Password'}</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" size="lg">
              {isAr ? 'تسجيل الدخول' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              {isAr ? 'للاختبار، استخدم:' : 'For testing, use:'}
            </p>
            <div className="mt-2 space-y-1 font-mono text-xs bg-muted p-3 rounded">
              <p>admin@demo.local / admin123</p>
              <p>partner@demo.local / partner123</p>
              <p>user@demo.local / user123</p>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isAr ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
            <Link href={`/auth/signup?lang=${lang}`} className="text-primary hover:underline">
              {isAr ? 'سجل الآن' : 'Sign up'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

