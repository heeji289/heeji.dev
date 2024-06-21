import { Post } from '@/lib/types';
import { BlockMapType } from 'react-notion';

const NOTION_API_URL = 'https://notion-api.splitbee.io/v1/table/';

const REVALIDATE_TIME = 60 * 60 * 3; // 3시간

export async function getAllPosts(): Promise<Post[] | null> {
  try {
    const result = await fetch(
      `${NOTION_API_URL}${process.env.NOTION_BLOG_ID}`,
      { next: { revalidate: REVALIDATE_TIME } }
    ).then((res) => res.json());

    return result;
  } catch (err) {
    // error
    return null;
  }
}

export async function getPost(
  id: string
): Promise<{ blocks: BlockMapType; post: Post | undefined } | null> {
  try {
    const posts = await getAllPosts();

    const post = posts?.find((post) => post.id === id);

    const blocks: BlockMapType = await fetch(
      `https://notion-api.splitbee.io/v1/page/${id}`,
      { next: { revalidate: REVALIDATE_TIME } }
    ).then((res) => res.json());

    return { blocks, post };
  } catch (err) {
    // error
    return null;
  }
}
