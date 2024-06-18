import { Post } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

export default function PostCard({
  title,
  tags,
  date,
}: Pick<Post, 'title' | 'tags' | 'date'>) {
  return (
    <div className='flex justify-between items-center gap-2'>
      <Image
        src={'/icons/speaker.png'}
        alt='speaker icon image'
        width={16}
        height={16}
      />
      <span className='grow'>{title}</span>
      <span className='text-xs'>{date}</span>
    </div>
  );
}
