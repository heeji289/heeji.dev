import FilteredPostList from '@/components/FilteredPostList';
import { Metadata } from 'next';
import React from 'react';
import { postsSortedByDate as posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Posts | heeji.dev',
  description: '작성한 글을 모아둔 곳',
};

export default async function PostsPage() {
  if (!posts) {
    return <h1>Empty</h1>; // TODO: Empty UI
  }

  return <FilteredPostList />;
}
