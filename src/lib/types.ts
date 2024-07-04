export type PostServer = {
  id: string;
  tags: string[];
  slug: string;
  title: string;
  date: string;
  pinned?: string; // true, false
};

export type Post = {
  id: string;
  tags: string[];
  slug: string;
  title: string;
  date: string;
  year: string;
  dateWithoutYear: string;
  pinned?: boolean;
};

export enum Theme {
  dark = 'dark',
  light = 'light',
}

export type TOCItem = {
  id: string;
  title: string;
  level: number;
};
