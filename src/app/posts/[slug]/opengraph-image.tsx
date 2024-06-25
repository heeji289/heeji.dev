import { getPost } from '@/service/post';
import clsx from 'clsx';
import { ImageResponse } from 'next/og';

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

// Route segment config
export const runtime = 'edge';

// Image metadata
// export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: Props) {
  const slug = params.slug;
  const result = await getPost(params.slug);
  const post = result?.post;

  if (!result) {
    return new Response(
      JSON.stringify({
        message: 'Could not find post with slug: ' + slug,
      }),
      {
        status: 404,
      }
    );
  }

  const pretendardRegular = fetch(
    new URL('/public/Pretendard-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        tw='w-full h-full p-4 flex'
        style={{
          backgroundImage: 'linear-gradient(to right, #f6f204, #ff9900)',
          fontFamily: '"Pretendard"',
        }}
      >
        <div tw='rounded-xl border-2 border-stone-700 w-full h-full p-4 flex bg-stone-800 shadow-lg'>
          <div tw='flex flex-col px-6 w-[740px] h-full justify-between'>
            <div tw='flex flex-col'>
              <span
                tw={clsx('font-bold text-stone-50 mb-6', {
                  'text-7xl': (post?.title.length ?? 0) < 40,
                  'text-6xl': (post?.title.length ?? 0) >= 40,
                })}
                style={{
                  fontFamily: '"Pretendard"',
                }}
              >
                {post?.title ?? ''}
              </span>
              <span tw='text-5xl text-stone-300'>{post?.slug ?? ''}</span>
            </div>
          </div>

          <div tw='flex items-center'>
            {/* TODO: profile image */}
            <p tw='ml-6 text-4xl font-semibold text-stone-400'>heeji.dev</p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Pretendard',
          data: await pretendardRegular,
          style: 'normal',
          weight: 500,
        },
      ],
    }
  );
}
