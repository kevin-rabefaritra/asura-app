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
  content: string;
  status: PostStatus;
  tags?: string[];
  references?: string[];
  mediaUris?: string[];
}

export enum EventType {
  ART_ENTERTAINMENT = 'ART_ENTERTAINMENT',
  MUSIC_PERFORMANCE = 'MUSIC_PERFORMANCE',
  SPORT_FITNESS = 'SPORT_FITNESS',
  EDUCATION_NETWORKING = 'EDUCATION_NETWORKING',
  FOOD_LIFESTYLE = 'FOOD_LIFESTYLE'
}