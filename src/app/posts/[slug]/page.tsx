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
      <NotionRenderer blockMap={result.blocks} />
    </div>
  );
}
