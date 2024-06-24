'use client';

import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
import useSearch from '@/hooks/useSearch';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export default function Search() {
  const { isLoading, result, searchResult, query } = useSearch();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <FaSearch />
        </Button>
      </SheetTrigger>
      <SheetContent side={'top'} aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>검색</SheetTitle>
        </SheetHeader>

        <Input value={query} onChange={(e) => searchResult(e.target.value)} />

        {isLoading ? (
          <span>로딩중..</span> // TODO: loading UI
        ) : (
          result.map((post) => <div key={post.id}>{post.title}</div>)
        )}
      </SheetContent>
    </Sheet>
  );
}
