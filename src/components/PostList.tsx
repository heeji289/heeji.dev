import Link from 'next/link';
import { Post } from 'content-collections';
import { inferPostType, POST_TYPE_LABEL } from '@/lib/posts';

type Props = {
  posts: Post[];
  emptyMessage?: string;
  showType?: boolean;
  showTags?: boolean;
};

export default function PostList({
  posts,
  emptyMessage,
  showType = true,
  showTags = true,
}: Props) {
  if (posts.length === 0) {
    return (
      <p className='rounded-md border border-dashed border-base-300 p-4 text-sm text-base-500 dark:border-base-700 dark:text-base-400'>
        {emptyMessage ?? '아직 글이 없습니다.'}
      </p>
    );
  }

  return (
    <ul className='divide-y divide-base-200 dark:divide-base-700'>
      {posts.map((post) => {
        const metaItems = [
          showType ? POST_TYPE_LABEL[inferPostType(post)] : '',
          post.date,
          showTags ? post.tags.map((tag) => `#${tag}`).join(' ') : '',
        ].filter(Boolean);

        return (
          <li key={post._meta.path} className='py-3'>
            <Link
              href={`/posts/${post._meta.path}`}
              className='group block focus-visible:outline-none'
            >
              <h3 className='text-[15px] leading-6 text-base-900 underline-offset-4 group-hover:underline dark:text-base-50'>
                {post.title}
              </h3>
              {metaItems.length > 0 && (
                <p className='mt-1 line-clamp-1 text-xs text-base-500 dark:text-base-400'>
                  {metaItems.join(' · ')}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
