'use client';

import { Post } from '@/lib/types';
import { convertToUniqArray } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react';

export default function FilteredPostList({ posts }: { posts: Post[] }) {
  const [selectedTag, setSelectedTag] = useState('');

  const tags = convertToUniqArray(
    posts?.flatMap((post) => post.tags).filter((tag) => tag != null) ?? []
  );

  const filteredPosts =
    selectedTag !== ''
      ? posts.filter((post) => post.tags?.includes(selectedTag))
      : posts;

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div>
      <div className='flex flex-wrap gap-2 py-2'>
        {tags?.map((tag) => (
          <button
            onClick={() => handleSelectTag(tag)}
            key={tag}
            className='relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900'
          >
            <span className=''>{tag}</span>
          </button>
        ))}
      </div>

      {filteredPosts.map((post: Post) => (
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
