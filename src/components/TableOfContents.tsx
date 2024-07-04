'use client';

import { TableOfContentsEntry } from 'notion-utils';
import React, { useEffect, useState, useRef } from 'react';

type TableOfContentsProps = {
  toc: TableOfContentsEntry[];
};

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const [targetId, setTargetId] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const minLevel = Math.min(...toc.map((t) => t.indentLevel));

  const removeHyphens = (str: string): string => str.replace(/-/g, '');

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute('data-id') ?? '');
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    toc.forEach((heading) => {
      const element = document.querySelector(
        `[data-id="${removeHyphens(heading.id)}"]`
      );

      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [toc]);

  useEffect(() => {
    if (targetId) {
      const element = document.querySelector(`[data-id="${targetId}"]`);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTargetId(null);
      }
    }
  }, [targetId]);

  const scrollToHeading = (id: string) => {
    setTargetId(id);
  };

  return (
    <nav className='toc lg:max-w-[200px]'>
      <h2 className='text-xl font-bold mb-4'>목차</h2>
      <ul className='space-y-2 text-sm '>
        {toc.map((heading) => (
          <li
            key={heading.id}
            style={{
              marginLeft: `${(heading.indentLevel - minLevel) * 0.5}rem`,
            }}
            className={`
              ${
                removeHyphens(activeId) === removeHyphens(heading.id)
                  ? 'font-bold text-primary'
                  : ''
              }
            `}
          >
            <a
              href={`#${removeHyphens(heading.id)}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(removeHyphens(heading.id));
              }}
              className='hover:text-primary transition-colors'
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
