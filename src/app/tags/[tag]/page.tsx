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
    <div className='space-y-6'>
      <section className='space-y-1'>
        <h2 className='text-2xl font-semibold'>#{tag}</h2>
        <p className='text-sm text-base-600 dark:text-base-300'>
          총 {filteredPosts.length}개 글
        </p>
      </section>

      <PostList posts={filteredPosts} showTags={false} />
    </div>
  );
}
