import { Post } from '@/lib/types';
import Link from 'next/link';
import React from 'react';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className='flex justify-between items-center py-2'>
        <div className='text-lg flex-1'>{post.title}</div>
        <span className='text-xs flex-shrink-0'>{post.dateWithoutYear}</span>
      </div>
    </Link>
  );
}
