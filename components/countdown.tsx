'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownProps {
  endsAt: Date;
  locale?: string;
  className?: string;
  showIcon?: boolean;
}

function toArabicNumerals(num: number): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(d => arabicNumerals[parseInt(d)] || d).join('');
}

export function Countdown({ endsAt, locale = 'ar', className = '', showIcon = true }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const difference = new Date(endsAt).getTime() - Date.now();
      
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endsAt, mounted]);

  if (!mounted || !timeLeft) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {showIcon && <Clock className="w-4 h-4" />}
        <span className="font-mono tabular-nums">--:--:--</span>
      </div>
    );
  }

  const formatTime = (value: number) => {
    const formatted = value.toString().padStart(2, '0');
    return locale === 'ar' ? toArabicNumerals(parseInt(formatted)) : formatted;
  };

  return (
    <div 
      className={`flex items-center gap-1.5 ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {showIcon && <Clock className="w-4 h-4" />}
      <span className="font-mono tabular-nums">
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </span>
    </div>
  );
}

