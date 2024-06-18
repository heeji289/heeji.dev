export type Post = {
  id: string;
  tags: string[];
  slug: string;
  title: string;
  date: string;
  pinned?: string; // true, false
};
