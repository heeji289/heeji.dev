import { Metadata } from 'next';
import PostList from '@/components/PostList';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Posts | heeji.dev',
  description: '작성한 글을 모아둔 곳',
};

export default function PostsPage() {
  return (
    <div className='space-y-3'>
      <h2 className='flex items-baseline gap-2 text-base font-medium'>
        Posts
        <span className='font-normal text-base-500 dark:text-base-400'>
          {posts.length}
        </span>
      </h2>

      <PostList posts={posts} />
    </div>
  );
}
