import type { Metadata } from 'next';
import './globals.css';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { cookies } from 'next/headers';

import localFont from 'next/font/local';
import Header from '@/components/Header';

const myFont = localFont({
  src: '../../public/Pretendard-Regular.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'heeji.dev',
  description: '임희지의 개발 블로그. 프론트엔드 개발 관련 기록을 남깁니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get('theme');

  return (
    <html lang='ko' className={theme?.value}>
      <body
        className={`${myFont.className} bg-background text-black antialiased dark:text-white`}
      >
        <section className='mx-auto max-w-3xl px-4 pt-20 sm:px-6 xl:mx-w-[50rem] xl:px-8'>
          <div className='box-border flex h-full flex-col justify-between'>
            <Header />
            <main className='max-w-screen-sm mx-auto pb-6'>{children}</main>
          </div>
        </section>
      </body>
    </html>
  );
}
