'use client';

import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
import useSearch from '@/hooks/useSearch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PostCard from './PostCard';

export default function Search() {
  const { isLoading, result, searchResult, query } = useSearch();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <FaSearch />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className='w-[400px] sm:w-[540px]'
      >
        <DialogHeader>
          <DialogTitle>검색</DialogTitle>
        </DialogHeader>

        <Input value={query} onChange={(e) => searchResult(e.target.value)} />

        {isLoading ? (
          <span>로딩중..</span> // TODO: loading UI
        ) : (
          result.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </DialogContent>
    </Dialog>
  );
}
