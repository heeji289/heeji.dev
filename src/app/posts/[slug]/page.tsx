import Giscus from '@/components/Giscus';
import NotionPage from '@/components/NotionPage';
import TableOfContents from '@/components/TableOfContents';
import { getPostList } from '@/lib/notion2';
import { getPost } from '@/service/post';
import { Metadata } from 'next';
import { Block, ExtendedRecordMap, PageBlock } from 'notion-types';
import { getPageTableOfContents } from 'notion-utils';
import React from 'react';

type Param = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Param;
}): Promise<Metadata> {
  const result = await getPost(params.slug);

  return {
    title: result?.post?.title ?? '',
    authors: [{ name: ' 임희지', url: 'https://heeji.dev' }],
    keywords: result?.post?.tags ?? [],
    openGraph: {
      title: result?.post?.title ?? '',
      siteName: 'heeji.dev',
      locale: 'ko_KR',
      type: 'article',
      authors: '임희지',
      tags: result?.post?.tags ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title: result?.post?.title ?? '',
      creator: '@huge_0314',
    },
  };
}
export async function generateStaticParams() {
  const posts = await getPostList();
  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) ?? []
  );
}

export default async function PostDetailPage({ params }: { params: Param }) {
  const result = await getPost(params.slug);

  if (!result || !result.post) {
    return <div>Post not found</div>;
  }

  const pageBlock = Object.values(result.recordMap.block).find(
    (block) => block.value.type === 'page'
  )?.value as PageBlock;

  const toc = getPageTableOfContents(pageBlock, result.recordMap);

  return (
    <div className='container mx-auto px-0 relative'>
      <div className='py-4'>
        <h1 className='text-3xl font-bold text-center'>{result.post.title}</h1>
        <div className='text-center'>
          <span className='text-sm text-neutral-600'>{result.post.date}</span>
        </div>
      </div>

      <div className='mb-8 lg:fixed lg:left-[calc(50%-38rem)] lg:z-10 lg:w-[18rem] lg:top-[5rem] lg:bottom-0 lg:overflow-y-auto'>
        <nav className='lg:py-10'>
          <TableOfContents toc={toc} />
        </nav>
      </div>

      <div className='lg:max-w-3xl lg:mr-auto'>
        <NotionPage recordMap={result.recordMap} />
        <Giscus />
      </div>
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
