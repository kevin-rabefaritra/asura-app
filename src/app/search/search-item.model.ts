import { Event } from "../events/event.model";
import { Post } from "../posts/post.model";

export interface SearchItem {
  type: ItemType;
  post: Post | null;
  event: Event | null;
}

export enum ItemType {
  POST = 'POST',
  EVENT = 'EVENT'
}