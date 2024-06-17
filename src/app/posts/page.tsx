import FilteredPostList from '@/components/FilteredPostList';
import { getAllPosts } from '@/lib/queries';
import React, { useState } from 'react';

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
