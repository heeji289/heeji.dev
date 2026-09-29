'use client';

import { useEffect, useState } from 'react';

type Item = {
  id: string;
  text: string;
  level: number;
};

const INDENT = ['', 'pl-3', 'pl-6'];

export default function TableOfContents() {
  const [items, setItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        'article .prose :is(h1, h2, h3)[id]'
      )
    );

    setItems(
      headings.map((heading) => ({
        id: heading.id,
        text: heading.textContent ?? '',
        level: Number(heading.tagName[1]),
      }))
    );

    // 화면 위쪽 30% 안으로 들어온 제목을 현재 위치로 본다
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '0px 0px -70% 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  const minLevel = Math.min(...items.map((item) => item.level));

  return (
    <nav aria-label='목차' className='sticky top-16 space-y-2 text-sm'>
      {items.map((item, index) => (
        <a
          key={`${item.id}-${index}`}
          href={`#${item.id}`}
          className={`block leading-snug transition-colors hover:text-base-900 dark:hover:text-base-50 ${
            INDENT[item.level - minLevel]
          } ${
            item.id === activeId
              ? 'text-base-900 dark:text-base-50'
              : 'text-base-500 dark:text-base-400'
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
