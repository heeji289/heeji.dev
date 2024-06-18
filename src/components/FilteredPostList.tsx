'use client';

import { Post } from '@/lib/types';
import { convertToUniqArray } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react';
import PostCard from './PostCard';
import Chip from './ui/Chip';

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
      <div className='flex flex-wrap gap-1 py-2'>
        {tags?.map((tag) => (
          <Chip
            key={tag}
            onClickCallback={() => handleSelectTag(tag)}
            text={tag}
            theme={tag === selectedTag ? 'info' : 'default'}
          />
        ))}
      </div>

      <section className='flex flex-col gap-2'>
        {filteredPosts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
