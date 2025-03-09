
export type BlogPostType = {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: 'medium' | 'substack' | 'other';
  date: string;
  image?: string;
};
