import Link from 'next/link';
import React from 'react';
import { Post } from 'content-collections';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post._meta.path}`}>
      <div className='flex justify-between items-center py-2'>
        <div className='text-md flex-1 hover:underline hover:decoration-primary hover:decoration-dashed'>
          {post.title}
        </div>
        <span className='text-xs flex-shrink-0'>{post.date}</span>
      </div>
    </Link>
  );
}
