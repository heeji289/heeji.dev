'use client';

import { useEffect, useState } from 'react';
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
import { BiSearchAlt2 } from 'react-icons/bi';
import { usePathname } from 'next/navigation';

export default function Search() {
  const [open, setOpen] = useState(false);
  const { isLoading, result, searchResult, query } = useSearch();
  const pathname = usePathname();

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleDialogClose();
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <BiSearchAlt2 size={24} />
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
          result.map((post) => <PostCard key={post._meta.path} post={post} />)
        )}
      </DialogContent>
    </Dialog>
  );
}
