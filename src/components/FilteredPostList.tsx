'use client';

import { convertToUniqArray } from '@/lib/utils';
import React, { useState } from 'react';
import PostCard from './PostCard';
import Chip from './ui/Chip';
import { Separator } from './ui/separator';
import { allPosts, Post } from 'content-collections';

type PostGroupByYear = {
  [key in string]: Post[];
};

// util
const groupPostsByYear = (posts: Post[]): PostGroupByYear => {
  return posts.reduce((acc: PostGroupByYear, post) => {
    const year = post.date.split('-')[0];

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(post);
    return acc;
  }, {});
};

const sortByYear = (posts: PostGroupByYear) => {
  return Object.keys(posts).sort((a, b) => Number(b) - Number(a));
};

// ************************************************************

const YearSection = ({ year, posts }: { year: string; posts: Post[] }) => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>{year}</h1>
      {posts.map((post) => (
        <PostCard key={post._meta.path} post={post} />
      ))}
    </div>
  );
};

// ************************************************************

export default function FilteredPostList() {
  const [selectedTag, setSelectedTag] = useState('');

  const tags = convertToUniqArray(
    allPosts?.flatMap((post) => post.tags).filter((tag) => tag != null) ?? []
  );

  const filteredPosts =
    selectedTag !== ''
      ? allPosts.filter((post) => post.tags?.includes(selectedTag))
      : allPosts;

  const postsGroupbyYear = groupPostsByYear(filteredPosts);
  const sortedYears = sortByYear(postsGroupbyYear);

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className='py-4'>
      <div className='flex flex-wrap gap-2 py-4'>
        {tags?.map((tag) => (
          <Chip
            key={tag}
            onClickCallback={() => handleSelectTag(tag)}
            text={tag}
            theme={tag === selectedTag ? 'default' : 'outline'}
          />
        ))}
      </div>

      <div className='flex flex-col gap-2 py-6'>
        {sortedYears.map((year, index) => (
          <React.Fragment key={year}>
            {index !== 0 && <Separator className='my-6' />}

            <YearSection year={year} posts={postsGroupbyYear[year]} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
