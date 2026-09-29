'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@/components/Icons';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const handleToggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  return (
    <button
      type='button'
      onClick={handleToggle}
      aria-label='테마 전환'
      className='inline-flex h-7 w-7 items-center justify-center rounded-md text-base-500 transition-colors hover:text-info-600 dark:text-base-400 dark:hover:text-info-400'
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
