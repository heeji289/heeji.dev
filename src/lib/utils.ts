import { type ClassValue, clsx } from 'clsx';
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
