import { getPost } from '@/lib/queries';
import React from 'react';
import { NotionRenderer } from 'react-notion';

type Param = {
  slug: string;
};

export default async function PostDetailPage({ params }: { params: Param }) {
  const result = await getPost(params.slug);

  if (!result) {
    return;
  }

  return (
    <div>
      <h1 className='text-3xl font-semibold'>{result.post?.title ?? ''}</h1>
      <span>{result.post?.date ?? ''}</span>
      <NotionRenderer blockMap={result.blocks} />
    </div>
  );
}
