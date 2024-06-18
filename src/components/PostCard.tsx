import { Post } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className='flex justify-between items-center gap-2'>
        <Image
          src={'/icons/speaker.png'}
          alt='speaker icon image'
          width={16}
          height={16}
        />
        <span className='grow'>{post.title}</span>
        <span className='text-xs'>{post.date}</span>
      </div>
    </Link>
  );
}
