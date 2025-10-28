'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlide {
  id: string;
  imageUrl: string;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  ctaTextAr?: string;
  ctaTextEn?: string;
  ctaLink?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  locale?: string;
  autoPlayInterval?: number;
}

export function HeroCarousel({ 
  slides, 
  locale = 'ar',
  autoPlayInterval = 6000 
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isAr = locale === 'ar';

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPaused, slides.length, autoPlayInterval, goToNext]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div 
      className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-muted"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.imageUrl}
              alt={isAr ? slide.titleAr : slide.titleEn}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
            
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
              <div className="container mx-auto h-full flex items-center px-6 md:px-12">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {isAr ? slide.titleAr : slide.titleEn}
                  </h1>
                  {(isAr ? slide.subtitleAr : slide.subtitleEn) && (
                    <p className="text-lg md:text-xl text-white/90 mb-6">
                      {isAr ? slide.subtitleAr : slide.subtitleEn}
                    </p>
                  )}
                  {slide.ctaLink && (isAr ? slide.ctaTextAr : slide.ctaTextEn) && (
                    <Button 
                      asChild 
                      size="lg"
                      className="text-base md:text-lg px-8"
                    >
                      <Link href={slide.ctaLink}>
                        {isAr ? slide.ctaTextAr : slide.ctaTextEn}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors [dir=rtl]:left-auto [dir=rtl]:right-4"
            aria-label={isAr ? 'السابق' : 'Previous'}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors [dir=rtl]:right-auto [dir=rtl]:left-4"
            aria-label={isAr ? 'التالي' : 'Next'}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`${isAr ? 'الشريحة' : 'Slide'} ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

