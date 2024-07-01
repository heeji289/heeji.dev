import type { Metadata } from 'next';
import './globals.css';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { cookies } from 'next/headers';
import { IBM_Plex_Mono, Noto_Serif_KR } from 'next/font/google';

import Header2 from '@/components/Header2';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'heeji.dev',
  description: '임희지의 개발 블로그. 프론트엔드 개발 관련 기록을 남깁니다.',
  metadataBase: new URL('https://heeji.dev'),
};

const mono = IBM_Plex_Mono({
  weight: '500',
  subsets: ['latin'],
});

const serif = Noto_Serif_KR({
  weight: '600',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get('theme');

  return (
    <html lang='ko' className={`${theme?.value} ${mono.className}`}>
      <body className={`bg-background text-black antialiased dark:text-white`}>
        <section className='mx-auto max-w-3xl xl:mx-w-[50rem] xl:px-8'>
          <div className='box-border flex h-full flex-col justify-between'>
            <Header2 />
            <Separator className='dark:bg-primary' />
            <main className='pb-6 px-4'>{children}</main>
            <Footer />
          </div>
        </section>
      </body>
    </html>
  );
}
