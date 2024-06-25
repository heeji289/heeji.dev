import Giscus from '@/components/Giscus';
import { Separator } from '@/components/ui/separator';
import { getAllPosts, getPost } from '@/service/post';
import { Metadata } from 'next';
import React from 'react';
import { NotionRenderer } from 'react-notion';

type Param = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Param;
}): Promise<Metadata> {
  const result = await getPost(params.slug);

  return {
    title: result?.post?.title ?? '',
    authors: [{ name: ' 임희지', url: 'https://heeji.dev' }],
    keywords: result?.post?.tags ?? [],
    openGraph: {
      title: result?.post?.title ?? '',
      siteName: 'heeji.dev',
      locale: 'ko_KR',
      type: 'article',
      authors: '임희지',
      tags: result?.post?.tags ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title: result?.post?.title ?? '',
      creator: '@huge_0314',
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return (
    posts?.map((post) => ({
      slug: post.id,
    })) ?? []
  );
}

export default async function PostDetailPage({ params }: { params: Param }) {
  const result = await getPost(params.slug);

  if (!result) {
    return;
  }

  return (
    <div>
      <div className='py-4'>
        <h1 className='text-3xl font-semibold'>{result.post?.title ?? ''}</h1>
        <span>{result.post?.date ?? ''}</span>
      </div>

      <Separator className='my-4' />

      <NotionRenderer blockMap={result.blocks} />

      <Giscus />
    </div>
  );
}
