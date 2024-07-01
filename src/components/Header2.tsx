'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import Search from './Search';
import ThemeToggle from './ThemeToggle';

const navigationData = [
  {
    path: '/posts',
    pathName: 'Post',
  },
  {
    path: '/about',
    pathName: 'About',
  },
];

export default function Header2() {
  // TODO: 선택된 path에 밑줄

  return (
    <header className='flex items-center justify-between px-4 py-8 '>
      <Link href={'/'}>
        <h1 className='text-2xl font-bold'>heeji.dev</h1>
      </Link>

      <div className='flex space-x-4'>
        <ul className='flex space-x-4'>
          {navigationData.map((data) => (
            <li key={data.path}>
              <Link href={data.path}>
                <Button variant={'ghost'} className='text-md font-semibold'>
                  {data.pathName}
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        <Search />
        <ThemeToggle />
      </div>
    </header>
  );
}
