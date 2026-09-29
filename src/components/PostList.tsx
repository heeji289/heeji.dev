import Link from 'next/link';
import { Post } from 'content-collections';

type Props = {
  posts: Post[];
  emptyMessage?: string;
  showTags?: boolean;
};

export default function PostList({
  posts,
  emptyMessage,
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
    <ul className='space-y-1'>
      {posts.map((post) => (
        <li key={post._meta.path}>
          <Link
            href={`/posts/${post._meta.path}`}
            className='group flex items-baseline gap-6 py-1.5 focus-visible:outline-none sm:items-center'
          >
            <time
              dateTime={post.date}
              className='w-16 shrink-0 text-sm tabular-nums text-base-600 dark:text-base-400'
            >
              {post.date.slice(2).replaceAll('-', '.')}
            </time>

            <span className='min-w-0 flex-1 text-base-900 sm:truncate dark:text-base-50'>
              {post.title}
            </span>

            {showTags && (
              <span className='hidden shrink-0 gap-1.5 sm:flex'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-md bg-base-100 px-1.5 py-0.5 text-xs text-base-600 dark:bg-base-700 dark:text-base-300'
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
