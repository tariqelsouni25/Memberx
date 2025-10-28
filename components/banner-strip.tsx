import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BannerStripProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  locale?: string;
}

export function BannerStrip({ 
  imageUrl, 
  title, 
  subtitle, 
  ctaText, 
  ctaLink,
  locale = 'ar' 
}: BannerStripProps) {
  const content = (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl group">
      <Image
        src={imageUrl}
        alt={title || 'Banner'}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
      />
      {(title || subtitle || ctaText) && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="container mx-auto px-8 md:px-12">
            <div className="max-w-xl">
              {title && (
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-white/90 mb-4 text-sm md:text-base">
                  {subtitle}
                </p>
              )}
              {ctaText && ctaLink && (
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  {ctaText}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (ctaLink) {
    return (
      <Link href={ctaLink} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

