import { type ClassValue, clsx } from 'clsx';
import { BlockMapType } from 'react-notion';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToUniqArray<T>(array: T[]) {
  return Array.from(new Set(array));
}

/**
 * date를 받아 year과 dateWithoutYear로 분리
 * @param date '2014-06-12' 형태
 */
export function seperateDate(date: string): {
  year: string;
  dateWithoutYear: string;
} {
  const arr = date.split('-');

  return {
    year: arr[0],
    dateWithoutYear: arr.slice(1).join('.'),
  };
}

/**
 * block에서 heading을 추출하는 함수
 */
export function extractHeadings(blocks: BlockMapType) {
  const headings = [];

  for (const blockId in blocks) {
    const block = blocks[blockId].value;
    if (
      block.type === 'header' ||
      block.type === 'sub_header' ||
      block.type === 'sub_sub_header'
    ) {
      headings.push({
        id: block.id,
        text: block.properties?.title?.[0]?.[0] || '',
        level:
          block.type === 'header' ? 1 : block.type === 'sub_header' ? 2 : 3,
      });
    }
  }

  return headings;
}
