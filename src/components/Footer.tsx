import React from 'react';
import { Separator } from './ui/separator';

export default function Footer() {
  return (
    <footer className='px-4'>
      <Separator className='dark:bg-primary' />
      <div className='py-4'>
        <span>© 2024 임희지. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
