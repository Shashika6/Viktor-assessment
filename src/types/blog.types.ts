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
  body: string;
  author: Author;
  cover?: Image;
  excerpt: string;
  publication_date: string;
}

