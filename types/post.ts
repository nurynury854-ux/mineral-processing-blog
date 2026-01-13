export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  language?: 'mn' | 'en' | 'mixed';
  readingTime?: number;
  views?: number;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  language?: 'mn' | 'en' | 'mixed';
  readingTime?: number;
  views?: number;
}
