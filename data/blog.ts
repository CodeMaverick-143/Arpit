export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  tags: string[];
  featured: boolean;
  content: string;
}

export const blogPosts: BlogPost[] = [
  // Mock data removed. Add your first post here!
];
