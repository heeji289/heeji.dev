import { allPosts, Post } from 'content-collections';

export const posts = allPosts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const POST_TYPES = [
  'troubleshooting',
  'knowledge',
  'conference',
  'retrospective',
] as const;

export type PostType = (typeof POST_TYPES)[number];

export const POST_TYPE_LABEL: Record<PostType, string> = {
  troubleshooting: '트러블슈팅',
  knowledge: '지식 정리',
  conference: '컨퍼런스/발표',
  retrospective: '회고',
};

// knowledge는 키워드 없는 기본값. 아래 우선순위대로 먼저 매칭되는 타입을 쓴다.
const TYPE_KEYWORDS: Record<Exclude<PostType, 'knowledge'>, string[]> = {
  troubleshooting: ['trouble', 'issue', 'error', 'bug', '디버깅', '트러블', '해결'],
  conference: ['conference', 'meetup', 'talk', '발표', '컨퍼런스', '세미나', '후기'],
  retrospective: ['retrospective', '회고', 'restro', '돌아보기', 'retrospect'],
};

const TYPE_PRIORITY: Exclude<PostType, 'knowledge'>[] = [
  'troubleshooting',
  'conference',
  'retrospective',
];

const includesAny = (text: string, keywords: string[]) =>
  keywords.some((keyword) => text.includes(keyword));

export const inferPostType = (post: Post): PostType => {
  const text =
    `${post.title} ${post.tags.join(' ')} ${post._meta.path}`.toLowerCase();

  return (
    TYPE_PRIORITY.find((type) => includesAny(text, TYPE_KEYWORDS[type])) ??
    'knowledge'
  );
};

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
