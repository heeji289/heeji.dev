import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import { remarkCodeHike } from 'codehike/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

const posts = defineCollection({
  name: 'posts',
  directory: 'contents',
  include: '*.mdx',
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    pinned: z.boolean(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            // TODO: 테마에 맞게 수정
            theme: 'slack-dark',
            keepBackground: true,
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        [remarkCodeHike, { showCopyButton: true, autoImport: true }],
      ],
    });

    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
