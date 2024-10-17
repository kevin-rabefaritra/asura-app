
export interface Post {
  reference: string;
  author: string;
  publishedOn: string;
  summary: string;
  text: string;
  status: PostStatus;
  tags: string[];
  references: string[];
  mediaFiles: { path: string, tags: string[] }[];
  score: number;
  userScore: number;
};

export enum PostStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
};