'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Search from './Search';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

const navigationData = [
  {
    path: '/',
    pathName: 'Home',
  },
  {
    path: '/posts',
    pathName: 'Post',
  },
  {
    path: '/about',
    pathName: 'About',
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className='fixed inset-x-0 top-4 z-40 h-[60px] justify-center flex'>
      <div
        className={cn(
          'w-full max-w-[500px] items-center justify-between rounded-3xl border border-border bg-secondary px-4 shadow-sm saturate-100 backdrop-blur-[10px] sm:max-w-screen-md',
          isScrolled && 'border-transparent bg-background/80'
        )}
      >
        <div className='mx-auto flex h-[60px] w-full items-center justify-between'>
          <Link href={'/'}>
            <Image
              src={'/icons/smile.png'}
              alt='logo image'
              width={40}
              height={40}
            />
          </Link>

          <div className='flex items-center'>
            <nav className='sm:flex items-center'>
              <ul className='flex'>
                {navigationData.map((data) => (
                  <li key={data.path}>
                    <Link href={data.path}>
                      <Button
                        variant={'link'}
                        className='text-md font-semibold'
                      >
                        {data.pathName}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Search />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
