import Link from 'next/link';
import PostList from '@/components/PostList';
import { getPinnedPosts, getRecentPosts } from '@/lib/posts';

export default function HomePage() {
  const pinnedPosts = getPinnedPosts();
  const recentPosts = getRecentPosts();

  return (
    <div className='space-y-14'>
      <section className='space-y-5'>
        <p className='flex items-center gap-2 font-mono text-sm text-base-500 dark:text-base-400'>
          <span className='font-semibold text-info-500 dark:text-info-400'>
            {'>_'}
          </span>
          <span>heeji.dev</span>
          <span className='inline-block h-4 w-[2px] animate-caret-blink bg-info-500 dark:bg-info-400' />
        </p>
        <h2 className='text-[30px] font-semibold leading-tight text-base-900 dark:text-base-50'>
          안녕하세요.
          <br />
          프론트엔드 개발자 임희지입니다.
        </h2>
        <p className='max-w-2xl text-sm leading-relaxed text-base-600 dark:text-base-300'>
          실제로 구현하면서 맞닥뜨린 문제와 해결 과정을 중심으로 기록합니다.
          학습 노트, 컨퍼런스 후기, 회고도 함께 남깁니다.
        </p>
      </section>

      {pinnedPosts.length > 0 && (
        <section className='space-y-3'>
          <h3 className='text-base font-medium'>pinned posts</h3>
          <PostList posts={pinnedPosts} showType={false} />
        </section>
      )}

      <section className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h3 className='text-base font-medium'>recent posts</h3>
          <Link
            href='/posts'
            className='font-mono text-sm text-info-600 underline-offset-4 hover:underline dark:text-info-400'
          >
            all posts →
          </Link>
        </div>
        <PostList posts={recentPosts} showType={false} />
      </section>
    </div>
  );
}
