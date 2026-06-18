import type { Metadata } from 'next';
import './globals.css';
import { IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'heeji.dev',
  description: '임희지의 개발 블로그. 프론트엔드 개발 관련 기록을 남깁니다.',
  metadataBase: new URL('https://heeji.dev'),
  alternates: {
    types: {
      'application/rss+xml': 'https://heeji.dev/rss.xml',
    },
  },
};

const mono = IBM_Plex_Mono({
  weight: '500',
  subsets: ['latin'],
});

const pretendardMedium = localFont({
  src: '../../public/fonts/Pretendard-Medium.ttf',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ko'
      className={`${mono.className} ${pretendardMedium.className}`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          `,
          }}
        />
      </head>
      <body className={`bg-background text-black antialiased dark:text-white`}>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>
        <section className='mx-auto w-full max-w-2xl px-6 py-16 font-pretendard'>
          <div className='mb-12 border-b border-base-200 pb-5 dark:border-base-700'>
            <Nav />
          </div>
          {children}
        </section>
      </body>
    </html>
  );
}
