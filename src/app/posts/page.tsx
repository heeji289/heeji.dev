import FilteredPostList from '@/components/FilteredPostList';
import { getAllPosts } from '@/lib/queries';
import { Metadata } from 'next';
import React, { useState } from 'react';

export const metadata: Metadata = {
  title: 'Posts | heeji.dev',
  description: '작성한 글을 모아둔 곳',
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  if (!posts) {
    return <h1>Empty</h1>; // TODO: Empty UI
  }

  return (
    <div>
      <FilteredPostList posts={posts} />
    </div>
  );
}
