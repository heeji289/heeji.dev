'use client';

import React from 'react';
import { NotionRenderer } from 'react-notion-x';

export default function NotionPage({ recordMap }: { recordMap: any }) {
  return <NotionRenderer recordMap={recordMap} />;
}
