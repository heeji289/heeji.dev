import RSS from 'rss';
import { allPosts as posts } from 'content-collections';

export async function GET() {
  const feed = new RSS({
    title: 'heeji.dev',
    description: '임희지의 개발 블로그. 프론트엔드 개발 관련 기록을 남깁니다.',
    site_url: 'https://heeji.dev',
    feed_url: `https://heeji.dev/rss.xml`,
    copyright: `${new Date().getFullYear()} heeji.dev`,
    language: 'ko',
    pubDate: new Date(),
  });

  posts?.forEach((post) => {
    feed.item({
      title: post.title,
      guid: `https://heeji.dev/${post._meta.path}`,
      url: `https://heeji.dev/${post._meta.path}`,
      date: post.date, // TODO: 노션DB에 updateDate추가하고 변경할 것
      description: post._meta.path ?? '',
      author: '임희지',
      categories: post.tags || [],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
