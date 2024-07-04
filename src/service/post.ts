import { getRecordMap } from '@/lib/notion';
import { getPostList } from '@/lib/notion2';
import { Post } from '@/lib/types';
import { ExtendedRecordMap } from 'notion-types';

export async function getPost(
  slug: string
): Promise<{ recordMap: ExtendedRecordMap; post: Post | undefined } | null> {
  try {
    const posts = await getPostList();
    const post = posts?.find((post) => post.slug === slug);

    if (!post) {
      return null;
    }

    const recordMap = await getRecordMap(post.id);

    return { post, recordMap };
  } catch (err) {
    // error
    return null;
  }
}
