export interface Image {
  url: string;
}

export interface Author {
  id: number;
  full_name: string;
}

export interface BlogPost {
  id: number;
  title: string;
  author: Author | null; // Some posts didn't have an author
  cover?: Image;
  excerpt?: string;
  publication_date: string;
}

export type SortOrder = 'publication_date:DESC' | 'publication_date:ASC';

export const SORT_ORDER = {
  NEWEST_FIRST: 'publication_date:DESC',
  OLDEST_FIRST: 'publication_date:ASC',
} as const;

