import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Post } from './types';
import { seperateDate } from './utils';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function isFullPage(page: any): page is PageObjectResponse {
  return page.object === 'page' && 'properties' in page;
}

function getPropertyValue<T>(property: any, type: string): T | null {
  if (property && property.type === type) {
    return property[type] as T;
  }
  return null;
}

export async function getPostList() {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'date',
          direction: 'descending',
        },
      ],
    });

    return response.results.filter(isFullPage).map<Post>((page) => {
      const properties = page.properties;

      const date =
        getPropertyValue<{ start: string }>(properties.date, 'date')?.start ??
        '';
      const { year, dateWithoutYear } = seperateDate(date);

      return {
        id: page.id,
        title:
          getPropertyValue<Array<{ plain_text: string }>>(
            properties.title,
            'title'
          )?.[0]?.plain_text ?? '',
        date,
        tags:
          getPropertyValue<Array<{ name: string }>>(
            properties.tags,
            'multi_select'
          )?.map((m) => m.name) ?? [],
        slug:
          getPropertyValue<Array<{ plain_text: string }>>(
            properties.slug,
            'rich_text'
          )?.[0]?.plain_text ?? '',
        pinned:
          getPropertyValue<boolean>(properties.pinned, 'checkbox') ?? false,
        year,
        dateWithoutYear,
      };
    });
  } catch (err) {
    //
  }
}
