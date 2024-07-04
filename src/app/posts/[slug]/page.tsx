import Giscus from '@/components/Giscus';
import TableOfContents from '@/components/TableOfContents';
import { extractHeadings } from '@/lib/utils';
import { getAllPosts, getPost } from '@/service/post';
import { Metadata } from 'next';
import React from 'react';
import {
  BlockValueType,
  CustomBlockComponentProps,
  NotionRenderer,
} from 'react-notion';

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
  const posts = await getAllPosts();
  return (
    posts?.map((post) => ({
      slug: post.id,
    })) ?? []
  );
}

export default async function PostDetailPage({ params }: { params: Param }) {
  const result = await getPost(params.slug);
  const toc = extractHeadings(result?.blocks!);

  if (!result) {
    return;
  }

  return (
    <div className='container mx-auto px-0 relative'>
      <div className='py-4'>
        <h1 className='text-3xl font-bold text-center'>
          {result.post?.title ?? ''}
        </h1>
        <div className='text-center'>
          <span className='text-sm text-neutral-600'>
            {result.post?.date ?? ''}
          </span>
        </div>
      </div>

      <div className='mb-8 lg:fixed lg:left-[calc(50%-38rem)] lg:z-10 lg:w-[18rem] lg:top-[5rem] lg:bottom-0 lg:overflow-y-auto'>
        <nav className='lg:py-10'>
          <TableOfContents toc={toc} />
        </nav>
      </div>

      <div className='lg:max-w-3xl lg:mr-auto'>
        <NotionRenderer
          blockMap={result.blocks}
          customBlockComponents={{
            header: (props) => <CustomHeadingRenderer {...props} />,
            sub_header: (props) => <CustomHeadingRenderer {...props} />,
            sub_sub_header: (props) => <CustomHeadingRenderer {...props} />,
          }}
        />
        <Giscus />
      </div>
    </div>
  );
}

const CustomHeadingRenderer = <T extends BlockValueType['type']>(
  props: CustomBlockComponentProps<T>
) => {
  const { blockValue } = props;
  const id = blockValue.id;
  const text = blockValue.properties?.title?.[0]?.[0] || '';

  switch (blockValue.type) {
    case 'header':
      return (
        <h1 id={id} className='notion-h1'>
          {text}
        </h1>
      );
    case 'sub_header':
      return (
        <h2 id={id} className='notion-h2'>
          {text}
        </h2>
      );
    case 'sub_sub_header':
      return (
        <h3 id={id} className='notion-h3'>
          {text}
        </h3>
      );
    default:
      return null;
  }
};
