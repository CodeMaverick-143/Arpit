import blogData from '../blog.json';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  tags: string[];
  featured: boolean;
  link: string;
}


export const blogPosts: BlogPost[] = blogData as BlogPost[];

