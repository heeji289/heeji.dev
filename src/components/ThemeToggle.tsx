'use client';

import { Theme } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { BiMoon, BiSun } from 'react-icons/bi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(Theme.light);

  const handleClickButton = () => {
    const toggle = document.documentElement.classList.toggle(Theme.dark);
    const theme = toggle ? Theme.dark : Theme.light;
    setTheme(theme);
    window.localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    if (document.documentElement.classList.contains(Theme.dark)) {
      setTheme(Theme.dark);
    } else {
      setTheme(Theme.light);
    }
  }, []);

  return (
    <Button variant={'ghost'} size={'icon'} onClick={handleClickButton}>
      {theme === Theme.light ? <BiMoon size={24} /> : <BiSun size={24} />}
    </Button>
  );
}
