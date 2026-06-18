import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import Giscus from '@/components/Giscus';
import {
  POST_TYPE_LABEL,
  getPostBySlug,
  inferPostType,
  posts,
} from '@/lib/posts';

type Param = {
  slug: string;
};

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
    <article className='space-y-8'>
      <header className='space-y-4 border-b border-base-200 pb-6 dark:border-base-700'>
        <Link
          href='/posts'
          className='inline-flex items-center gap-1 font-mono text-sm text-info-600 underline-offset-4 hover:underline dark:text-info-400'
        >
          ← posts
        </Link>

        <h2 className='text-3xl font-semibold leading-tight'>{post.title}</h2>

        <div className='text-sm text-base-500 dark:text-base-300'>
          {post.date} · {POST_TYPE_LABEL[inferPostType(post)]}
        </div>

        <div className='flex flex-wrap gap-3'>
          {post.tags.map((tag) => (
            <Link
              key={`${post._meta.path}-${tag}`}
              href={`/tags/${encodeURIComponent(tag)}`}
              className='text-xs text-base-500 underline-offset-4 hover:underline dark:text-base-400'
            >
              #{tag}
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
