
export interface Post {
  reference: string;
  authorName: string;
  authorProfilePicture: String,
  publishedOn: string;
  summary: string;
  text?: string;
  status: PostStatus;
  tags?: string[];
  references?: string[];
  mediaUris?: string[];
  score: number;
  userScore: number;
};

export enum PostStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
};