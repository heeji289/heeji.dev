import { getPost } from '@/lib/queries';
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
      card: 'summary',
      title: result?.post?.title ?? '',
      creator: '@huge_0314',
    },
  };
}

export default async function PostDetailPage({ params }: { params: Param }) {
  const result = await getPost(params.slug);

  if (!result) {
    return;
  }

  return (
    <div className='divide-y divide-dashed'>
      <div className='py-4'>
        <h1 className='text-3xl font-semibold text-gray-900'>
          {result.post?.title ?? ''}
        </h1>
        <span className='text-gray-600'>{result.post?.date ?? ''}</span>
      </div>

      <NotionRenderer blockMap={result.blocks} />
    </div>
  );
}
