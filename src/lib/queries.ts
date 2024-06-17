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
  slug: string
): Promise<{ blocks: BlockMapType } | null> {
  try {
    const blocks: BlockMapType = await fetch(
      `https://notion-api.splitbee.io/v1/page/${slug}`
    ).then((res) => res.json());

    return { blocks };
  } catch (err) {
    // error
    return null;
  }
}
