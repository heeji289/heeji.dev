import PostCard from '@/components/PostCard';
import { Separator } from '@/components/ui/separator';
import { getAllPosts } from '@/service/post';

export default async function Home() {
  const posts = await getAllPosts();

  if (!posts) {
    return;
  }

  const pinnedPosts = posts.filter((post) => post.pinned);

  return (
    <main className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2 py-6'>
        <div>
          <span className='text-5xl font-bold'>heeji</span>
          <span className='text-5xl font-bold text-yellow-500'>.dev</span>
        </div>
        <span className='text-xl'>개인 기록과 기술 공부를 위한 블로그</span>
      </div>

      <div className='flex flex-col gap-2'>
        <span className='text-2xl font-semibold'>Pinned Posts</span>
        {pinnedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Separator className='my-1' />

      <div className='flex flex-col gap-2'>
        <span className='text-2xl font-semibold'>Latest Posts</span>

        {posts.slice(0, 5).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
