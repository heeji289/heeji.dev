import clsx from 'clsx';
import { allPosts } from 'content-collections';
import { ImageResponse } from 'next/og';

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

// Route segment config
// export const runtime = 'edge';

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

  // TODO: 필터 함수 공통으로 만들기
  const result = allPosts.find((post) => post._meta.path === params.slug);

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

  // const pretendardRegular = fetch(
  //   new URL('/public/Pretendard-Regular.ttf', import.meta.url)
  // ).then((res) => res.arrayBuffer());

  // const pretendardBold = fetch(
  //   new URL('/public/Pretendard-Bold.ttf', import.meta.url)
  // ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        tw='w-full h-full p-24 flex'
        style={{
          backgroundColor: '#fdf8ec',
          fontFamily: '"Pretendard"',
        }}
      >
        <div tw='w-full h-full flex flex-col justify-between'>
          <span tw='text-7xl font-bold'>{result?.title ?? ''}</span>
          <div tw='flex items-center justify-between'>
            <span tw='font-bold text-4xl'>heeji.dev</span>
            {/* <img
              tw='rounded-full'
              width='110'
              height='110'
              src='https://github-production-user-asset-6210df.s3.amazonaws.com/41099712/342551671-5aacbbaa-5303-4b72-9597-fa498ed938c9.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240625%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240625T015515Z&X-Amz-Expires=300&X-Amz-Signature=64b1d1b389b1094c95697df54c61289c58305f5a3e743ffe2101a73c3e58ffb2&X-Amz-SignedHeaders=host&actor_id=41099712&key_id=0&repo_id=809752399'
            /> */}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      // fonts: [
      //   {
      //     name: 'Pretendard',
      //     data: await pretendardRegular,
      //     style: 'normal',
      //     weight: 500,
      //   },
      //   {
      //     name: 'Pretendard',
      //     data: await pretendardBold,
      //     style: 'normal',
      //     weight: 700,
      //   },
      // ],
    }
  );
}
