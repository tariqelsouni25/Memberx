import Link from 'next/link';
import { auth } from '@/auth.config';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut, LayoutDashboard, Grid3x3 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MegaMenuTrigger } from '@/components/mega-menu/MegaMenuTrigger';
import { LanguageToggle } from '@/components/language-toggle';

interface HeaderProps {
  locale?: string;
  city?: string;
}

export async function Header({ locale = 'ar', city = 'riyadh' }: HeaderProps) {
  const session = await auth();
  const isAr = locale === 'ar';

  const navItems = [
    { labelAr: 'المطاعم والطعام', labelEn: 'Food & Dining', href: `/deals/${city}/food-dining` },
    { labelAr: 'التجميل والمنتجعات', labelEn: 'Beauty & Spa', href: `/deals/${city}/beauty-spa` },
    { labelAr: 'الفنادق', labelEn: 'Hotels', href: `/deals/${city}/hotels` },
    { labelAr: 'الأنشطة', labelEn: 'Activities', href: `/deals/${city}/activities` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href={`/deals/${city}`} className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Member X
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Mega Menu Trigger */}
            <MegaMenuTrigger city={city} isAr={isAr} />
            
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {isAr ? item.labelAr : item.labelEn}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <LanguageToggle currentLang={locale} />

            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isAr ? 'start' : 'end'}>
                  <DropdownMenuItem asChild>
                    <Link href="/account">
                      <User className="ml-2 h-4 w-4 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                      {isAr ? 'حسابي' : 'My Account'}
                    </Link>
                  </DropdownMenuItem>
                  {(session.user.role === 'ADMIN' || session.user.role === 'CONTENT_EDITOR') && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <LayoutDashboard className="ml-2 h-4 w-4 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                        {isAr ? 'لوحة التحكم' : 'Admin'}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {(session.user.role === 'PARTNER') && (
                    <DropdownMenuItem asChild>
                      <Link href="/partner">
                        <LayoutDashboard className="ml-2 h-4 w-4 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                        {isAr ? 'شريك' : 'Partner'}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action="/api/auth/signout" method="POST">
                      <button type="submit" className="flex w-full items-center">
                        <LogOut className="ml-2 h-4 w-4 [dir=rtl]:ml-0 [dir=rtl]:mr-2" />
                        {isAr ? 'تسجيل الخروج' : 'Sign Out'}
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm">
                <Link href="/auth/signin">{isAr ? 'تسجيل الدخول' : 'Sign In'}</Link>
              </Button>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
