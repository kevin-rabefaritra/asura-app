
export interface Post {
  reference: string;
  author: string;
  publishedOn: string;
  summary: string;
  text: string;
  tags: string[];
  references: string[];
  keywords: string[];
  mediaFiles: { path: string, tags: string[] }[];
  score: number;
}