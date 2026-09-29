import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import Giscus from '@/components/Giscus';
import TableOfContents from '@/components/TableOfContents';
import {
  formatDate,
  getPostBySlug,
  getReadingMinutes,
  posts,
} from '@/lib/posts';

type Param = {
  slug: string;
};

const MetaIcon = ({ d }: { d: string }) => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d={d} />
  </svg>
);

const CALENDAR_ICON =
  'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z';
const CLOCK_ICON = 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2';

export async function generateMetadata({
  params,
}: {
  params: Param;
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  return {
    title: post?.title ?? '',
    authors: [{ name: '임희지', url: 'https://heeji.dev' }],
    keywords: post?.tags ?? [],
    openGraph: {
      title: post?.title ?? '',
      siteName: 'heeji.dev',
      locale: 'ko_KR',
      type: 'article',
      authors: '임희지',
      tags: post?.tags ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title ?? '',
      creator: '@huge_0314',
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post._meta.path }));
}

export default function PostDetailPage({ params }: { params: Param }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className='relative space-y-8'>
      <aside className='absolute left-full top-0 ml-12 hidden h-full w-56 xl:block'>
        <TableOfContents />
      </aside>

      <header className='space-y-4'>
        <h1 className='text-4xl font-bold leading-snug tracking-tight'>
          {post.title}
        </h1>

        <div className='flex items-center gap-4 text-sm text-base-500 dark:text-base-400'>
          <span className='flex items-center gap-1.5'>
            <MetaIcon d={CALENDAR_ICON} />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className='flex items-center gap-1.5'>
            <MetaIcon d={CLOCK_ICON} />
            {getReadingMinutes(post.content)}분
          </span>
        </div>

        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <Link
              key={`${post._meta.path}-${tag}`}
              href={`/tags/${encodeURIComponent(tag)}`}
              className='rounded-md bg-base-100 px-2 py-0.5 text-xs text-base-600 transition-colors hover:bg-base-200 dark:bg-base-700 dark:text-base-300 dark:hover:bg-base-600'
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <Markdown code={post.mdx} />

      <section className='border-t border-base-200 pt-8 dark:border-base-700'>
        <Giscus />
      </section>
    </article>
  );
}
