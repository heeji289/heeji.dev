import Giscus from '@/components/Giscus';
import Markdown from '@/components/Markdown';
import TableOfContents from '@/components/TableOfContents';
import { allPosts } from 'content-collections';
import { Metadata } from 'next';
import React from 'react';

type Param = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Param;
}): Promise<Metadata> {
  const result = allPosts.find((post) => post._meta.path === params.slug);

  return {
    title: result?.title ?? '',
    authors: [{ name: ' 임희지', url: 'https://heeji.dev' }],
    keywords: result?.tags ?? [],
    openGraph: {
      title: result?.title ?? '',
      siteName: 'heeji.dev',
      locale: 'ko_KR',
      type: 'article',
      authors: '임희지',
      tags: result?.tags ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title: result?.title ?? '',
      creator: '@huge_0314',
    },
  };
}
export async function generateStaticParams() {
  return (
    allPosts?.map((post) => ({
      slug: post._meta.path ?? '',
    })) ?? []
  );
}

export default async function PostDetailPage({ params }: { params: Param }) {
  const post = allPosts.find((post) => post._meta.path === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  // const toc = getPageTableOfContents(pageBlock, result.recordMap);

  return (
    <div className='container mx-auto px-0 relative'>
      <div className='py-8'>
        <h1 className='font-bold text-4xl'>{post.title}</h1>
        <div>
          <span className='text-lg text-stone-500'>{post.date}</span>
        </div>
      </div>

      <div className='lg:max-w-3xl'>
        <Markdown code={post.mdx} />
        <Giscus />
      </div>
      {/* TODO: TOC */}
      {/*
      <div className='mb-8 lg:fixed lg:left-[calc(50%-38rem)] lg:z-10 lg:w-[18rem] lg:top-[5rem] lg:bottom-0 lg:overflow-y-auto'>
        <nav className='lg:py-10'>
          <TableOfContents toc={toc} />
        </nav>
      </div>

     */}
    </div>
  );
}

// const CustomHeadingRenderer = <T extends BlockValueType['type']>(
//   props: CustomBlockComponentProps<T>
// ) => {
//   const { blockValue } = props;
//   const id = blockValue.id;
//   const text = blockValue.properties?.title?.[0]?.[0] || '';

//   switch (blockValue.type) {
//     case 'header':
//       return (
//         <h1 id={id} className='notion-h1'>
//           {text}
//         </h1>
//       );
//     case 'sub_header':
//       return (
//         <h2 id={id} className='notion-h2'>
//           {text}
//         </h2>
//       );
//     case 'sub_sub_header':
//       return (
//         <h3 id={id} className='notion-h3'>
//           {text}
//         </h3>
//       );
//     default:
//       return null;
//   }
// };
