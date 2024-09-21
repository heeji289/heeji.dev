import { allPosts } from 'content-collections';

export const postsSortedByDate = allPosts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
