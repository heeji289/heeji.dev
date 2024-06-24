import { getAllPosts } from '@/service/post';
import { MetadataRoute } from 'next';

const baseURL = 'https://heeji.dev';

type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
};

const createUrl = (p: string) => baseURL + p;

const rootEntry: SitemapEntry = {
  url: baseURL,
  lastModified: new Date(),
};

const postListEntry: SitemapEntry = {
  url: createUrl('/posts'),
  lastModified: new Date(),
};

const aboutPageEntry: SitemapEntry = {
  url: createUrl('/about'),
  lastModified: new Date(),
};

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postEntries =
    posts?.map((post) => ({
      url: createUrl(`/posts/${post.id}`),
      lastModified: new Date(),
    })) ?? [];

  return [rootEntry, postListEntry, aboutPageEntry, ...postEntries];
}

export default sitemap;
