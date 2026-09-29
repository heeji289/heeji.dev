import { allPosts, Post } from 'content-collections';

export const posts = allPosts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post._meta.path === slug);

export const getPostsByTag = (tag: string) =>
  posts.filter((post) => post.tags.includes(tag));

export const getPinnedPosts = (limit = 3) =>
  posts.filter((post) => post.pinned).slice(0, limit);

export const getRecentPosts = (limit = 5) => {
  const pinnedPaths = new Set(getPinnedPosts().map((post) => post._meta.path));

  return posts
    .filter((post) => !pinnedPaths.has(post._meta.path))
    .slice(0, limit);
};

export const getTagCountMap = () => {
  const map = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }

  return map;
};

// '2026-09-11' → '2026년 9월 11일'
export const formatDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return `${year}년 ${month}월 ${day}일`;
};

// 코드 블록·이미지·링크 주소·마크다운 기호·공백을 뺀 글자 수를 분당 700자로 나눈 추정치
export const getReadingMinutes = (content: string) => {
  const text = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#>*_`|\-\s]/g, '');
  return Math.max(1, Math.round(text.length / 700));
};
