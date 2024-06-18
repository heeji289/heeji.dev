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
