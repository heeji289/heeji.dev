import FilteredPostList from '@/components/FilteredPostList';
import { getPostList } from '@/lib/notion2';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Posts | heeji.dev',
  description: '작성한 글을 모아둔 곳',
};

export default async function PostsPage() {
  const posts = await getPostList();

  if (!posts) {
    return <h1>Empty</h1>; // TODO: Empty UI
  }

  return (
    <>
      <FilteredPostList posts={posts} />
    </>
  );
}
