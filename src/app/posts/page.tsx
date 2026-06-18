import { Metadata } from 'next';
import PostList from '@/components/PostList';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Posts | heeji.dev',
  description: '작성한 글을 모아둔 곳',
};

export default function PostsPage() {
  return (
    <div className='space-y-12'>
      <header className='space-y-2'>
        <h2 className='text-2xl font-semibold'>posts</h2>
        <p className='text-sm text-base-500 dark:text-base-400'>
          총 {posts.length}개 글
        </p>
      </header>

      <PostList posts={posts} showType={false} />
    </div>
  );
}
