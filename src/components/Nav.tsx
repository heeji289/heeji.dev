'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

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
        className='inline-flex items-center py-1'
      >
        <Logo className='h-7 w-7 transition-transform hover:-translate-y-px' />
      </Link>

      <ul className='flex flex-wrap items-center gap-5 text-base-500 dark:text-base-400'>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`inline-block py-1 font-mono lowercase tracking-tight transition-colors ${
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
    </nav>
  );
}
