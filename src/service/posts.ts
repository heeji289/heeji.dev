import { getRecordMap } from '@/lib/notion';
import { Post } from '@/lib/types';
import { seperateDate } from '@/lib/utils';

export async function getAllPostsFromNotion() {
  const allPosts: Post[] = [];

  const recordMap = await getRecordMap(process.env.NOTION_DATABASE_ID!);
  const { block, collection } = recordMap;
  const schema = Object.values(collection)[0].value.schema;
  const propertyMap: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    propertyMap[schema[key].name] = key;
  });

  Object.keys(block).forEach((pageId) => {
    if (
      block[pageId].value.type === 'page' &&
      block[pageId].value.properties[propertyMap['slug']]
    ) {
      const { properties, last_edited_time, created_time } =
        block[pageId].value;

      //   const contents = block[pageId].value.content || [];
      //   const dates = contents.map((content) => {
      //     return block[content]?.value?.last_edited_time;
      //   });
      //   dates.push(last_edited_time);
      //   dates.sort((a, b) => b - a);
      //   const lastEditedAt = dates[0];

      const id = pageId;
      const slug = properties[propertyMap['slug']][0][0];
      const title = properties[propertyMap['title']][0][0];
      const categories = properties[propertyMap['tags']][0][0].split(',');
      //   const cover = properties[propertyMap['Cover']][0][1][0][1];
      const date = properties[propertyMap['date']][0][1][0][1]['start_date'];
      //   const published = properties[propertyMap['published']][0][0] === 'Yes';

      const { year, dateWithoutYear } = seperateDate(date);

      allPosts.push({
        id,
        title,
        slug,
        tags: categories,
        // Fix 403 error for images.
        // https://github.com/NotionX/react-notion-x/issues/211
        // cover: mapImageUrl(cover, block[pageId].value) || '',
        date,
        // published,
        // lastEditedAt,
        year,
        dateWithoutYear,
      });
    }
  });

  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
