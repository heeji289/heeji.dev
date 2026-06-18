import { Metadata } from 'next';
import Link from 'next/link';
import { getTagCountMap } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Tags | heeji.dev',
  description: '태그별 글 모음',
};

export default function TagsPage() {
  const tags = Array.from(getTagCountMap().entries()).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }

    return a[0].localeCompare(b[0], 'ko');
  });

  return (
    <div className='space-y-8'>
      <section className='space-y-2'>
        <h2 className='text-2xl font-semibold'>tags</h2>
        <p className='text-sm text-base-500 dark:text-base-400'>
          총 {tags.length}개 태그
        </p>
      </section>

      <ul className='space-y-2'>
        {tags.map(([tag, count]) => (
          <li key={tag}>
            <Link
              href={`/tags/${encodeURIComponent(tag)}`}
              className='inline-flex items-center gap-2 text-sm text-base-700 underline-offset-4 hover:underline dark:text-base-200'
            >
              <span>#{tag}</span>
              <span className='text-base-500 dark:text-base-400'>({count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
