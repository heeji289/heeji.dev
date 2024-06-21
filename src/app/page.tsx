import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/service/post';
import Image from 'next/image';

export default async function Home() {
  const posts = await getAllPosts();

  if (!posts) {
    return;
  }

  const pinnedPosts = posts.filter((post) => post.pinned);

  return (
    <main className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <Image
          src={'/icons/smile.png'}
          alt='logo image'
          width={102}
          height={102}
        />
        <div>
          <h1 className='text-2xl'>반갑습니다, 임희지입니다!</h1>
          <span>제품 만드는 게 좋아요</span>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <span>Pinned blog posts:</span>
        {pinnedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className='flex flex-col gap-2'>
        <span>Last blog posts:</span>
        {posts.slice(0, 5).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
