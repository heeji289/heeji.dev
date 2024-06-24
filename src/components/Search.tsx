'use client';

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from '@/components/ui/input';

export default function Search() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <FaSearch />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>검색</DialogTitle>
        </DialogHeader>

        <Input />

        {['검색결과1', '검색결과2'].map((text) => (
          <div key={text}>{text}</div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
