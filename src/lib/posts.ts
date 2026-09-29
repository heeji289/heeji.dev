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
