import { getAllPosts } from '@/lib/queries';
import { Post } from '@/lib/types';
import Link from 'next/link';
import React from 'react';

export default async function PostsPage() {
  const posts = await getAllPosts();

  if (!posts) {
    return <h1>Empty</h1>; // TODO: Empty UI
  }

  return (
    <div>
      {posts.map((post: Post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <div className='flex items-baseline gap-2'>
            <span className='text-lg font-semi-bold'>{post.title}</span>
            <span className='text-xs'>{post.date}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
