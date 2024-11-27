import { PostStatus } from "../posts/post.model";

export interface Event {
  reference: string;
  authorName: string;
  authorProfilePicture?: string;
  publishedOn: string;
  startDatetime: string;
  endDatetime?: string;
  title: string;
  location: string;
  address: string;
  type: EventType;
  summary: string;
  text?: string;
  status: PostStatus;
  tags?: string[];
  references?: string[];
  mediaUris?: string[];
}

export enum EventType {
  CONCERT = 'CONCERT',
  SPORT = 'SPORT'
}