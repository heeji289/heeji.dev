import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'heeji.dev';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // const pretendardRegular = fetch(
  //   new URL('/public/Pretendard-Regular.ttf', import.meta.url)
  // ).then((res) => res.arrayBuffer());

  // const pretendardBold = fetch(
  //   new URL('/public/Pretendard-Bold.ttf', import.meta.url)
  // ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        tw='w-full h-full flex flex-col items-center justify-center gap-4'
        style={{
          backgroundColor: '#fdf8ec',
          fontFamily: '"Pretendard"',
        }}
      >
        <span tw='text-8xl font-bold block'>heeji.dev</span>
        <span tw='text-4xl font-bold block'>임희지 개인 블로그</span>
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
