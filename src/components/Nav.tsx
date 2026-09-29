'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { href: '/posts', label: 'posts' },
  { href: '/tags', label: 'tags' },
  { href: '/about', label: 'about' },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className='flex items-center justify-between gap-4 text-sm'>
      <Link
        href='/'
        aria-label='heeji.dev home'
        className='inline-flex items-center gap-1 py-1 text-lg font-bold tracking-tight text-base-900 dark:text-base-50'
      >
        heeji.dev
        <span className='inline-block h-5 w-0.5 animate-caret-blink bg-info-500 dark:bg-info-400' />
      </Link>

      <div className='flex items-center gap-5'>
        <ul className='flex flex-wrap items-center gap-5 text-base-500 dark:text-base-400'>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`inline-block py-1 capitalize transition-colors ${
                  isActive(item.href)
                    ? 'text-info-600 dark:text-info-400'
                    : 'text-base-500 dark:text-base-400'
                } hover:text-info-600 dark:hover:text-info-400`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </div>
    </nav>
  );
}
