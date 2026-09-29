import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import PostList from '@/components/PostList';
import {getPostsByTag, getTagCountMap} from '@/lib/posts';

type Param = {
  tag: string;
};

export async function generateMetadata({
  params,
}: {
  params: Param;
}): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);

  return {
    title: `#${tag} | heeji.dev`,
    description: `${tag} 태그 글 목록`,
  };
}

export async function generateStaticParams() {
  return Array.from(getTagCountMap().keys()).map((tag) => ({tag}));
}

export default function TagDetailPage({params}: {params: Param}) {
  const tag = decodeURIComponent(params.tag);
  const filteredPosts = getPostsByTag(tag);

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className='space-y-3'>
      <h2 className='flex items-baseline gap-2 text-base font-medium'>
        #{tag}
        <span className='font-normal text-base-500 dark:text-base-400'>
          {filteredPosts.length}
        </span>
      </h2>

      <PostList posts={filteredPosts} showTags={false} />
    </div>
  );
}
