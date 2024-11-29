import { PostStatus } from "../posts/post.model";

export interface Event {
  reference: string;
  authorName: string;
  authorProfilePicture?: string;
  publishedOn: string;
  startsOn: string;
  endsOn: string | null;
  title: string;
  location: string;
  address: string;
  type: EventType;
  summary: string;
  content: string | null;
  status: PostStatus;
  tags?: string[];
  references?: string[];
  mediaUris?: string[];
}

export enum EventType {
  ART_ENTERTAINMENT,
  MUSIC_PERFORMANCE,
  SPORT_FITNESS,
  EDUCATION_NETWORKING,
  FOOD_LIFESTYLE
}