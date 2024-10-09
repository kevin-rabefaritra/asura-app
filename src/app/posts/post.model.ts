
export interface Post {
  reference: string;
  author: string;
  publishedOn: string;
  summary: string;
  text: string;
  tags: string[];
  references: string[];
  mediaFiles: { path: string, tags: string[] }[];
  score: number;
  userScore: number;
}