import { BlockMapType } from 'react-notion';
import { Post } from './types';

const NOTION_API_URL = 'https://notion-api.splitbee.io/v1/table/';

export async function getAllPosts(): Promise<Post[] | null> {
  try {
    const result = await fetch(
      `${NOTION_API_URL}${process.env.NOTION_BLOG_ID}`
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
      `https://notion-api.splitbee.io/v1/page/${id}`
    ).then((res) => res.json());

    return { blocks, post };
  } catch (err) {
    // error
    return null;
  }
}
