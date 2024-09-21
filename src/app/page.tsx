import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { FiGithub } from 'react-icons/fi';
import { PiLinkedinLogoBold } from 'react-icons/pi';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { postsSortedByDate as posts } from '@/lib/posts';

const GITHUB_LINK = 'https://github.com/heeji289';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/heeji289';

export default async function Home() {
  if (!posts) {
    return;
  }

  const pinnedPosts = posts.filter((post) => post.pinned);

  return (
    <main className='flex flex-col'>
      <section className='pt-8 pb-6'>
        <p className='py-1'>
          개인 기록과 기술 공부를 위한 저만의 블로그입니다. 사용자 경험을 위해
          빠르게 발전하는 프론트엔드 생태계를 좋아해요.
        </p>
        <div className='flex space-x-2'>
          <div>Social Links:</div>
          <div className='flex gap-2'>
            <Link href={GITHUB_LINK} rel='noopener noreferrer' target='_blank'>
              <FiGithub size={26} />
            </Link>

            <Link
              href={LINKEDIN_LINK}
              rel='noopener noreferrer'
              target='_blank'
            >
              <PiLinkedinLogoBold size={26} />
            </Link>
          </div>
        </div>
      </section>

      <div className='flex flex-col pt-12 pb-6'>
        <span className='text-2xl font-semibold pb-4 text-primary'>
          Featured
        </span>
        {pinnedPosts.map((post) => (
          <PostCard key={post._meta.path} post={post} />
        ))}
      </div>

      <div className='flex flex-col pt-12 pb-6'>
        <span className='text-2xl font-semibold pb-4 text-primary'>
          Recent Posts
        </span>
        {posts.slice(0, 5).map((post) => (
          <PostCard key={post._meta.path} post={post} />
        ))}
      </div>

      <Link href={'/posts'}>
        <Button variant={'ghost'} className='flex items-center space-x-2'>
          <span className='text-lg '>All Posts</span>
          <FaArrowRight />
        </Button>
      </Link>
    </main>
  );
}
