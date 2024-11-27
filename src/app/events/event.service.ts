import { Injectable } from "@angular/core";
import { Event, EventType } from "./event.model";
import { PostStatus } from "../posts/post.model";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  dummyEvent(): Event {
    return {
      reference: 'somereference',
      authorName: 'Apple',
      authorProfilePicture: 'https://cdn.niuz.app/2024/11/21/846124d2c20a96efe60328b3cdae3dd0',
      publishedOn: '2024-11-22T11:00:00',
      startDatetime: '2024-11-27T11:00:00',
      endDatetime: '2024-11-30T11:00:00',
      title: 'Marathon international de Lyon',
      address: 'Quai Romain Rolland 69005 Lyon',
      location: 'Lyon, France',
      type: EventType.SPORT,
      summary: 'some for some party lets go',
      text: 'some party blablabablsdifuhdbfiugh doifghbdigh obdfb gjdofjg odbfibjg dofjgdf',
      status: PostStatus.APPROVED,
      tags: ['party', 'Apple', 'concert'],
      references: ['https://google.com'],
      mediaUris: ['https://cdn.niuz.app/2024/11/21/aa00f0d05dc4771d4656d3d23b35abc8', 'https://cdn.niuz.app/2024/11/21/53d7e78b177245c99a91ce671c3e9824']
    };
  }
}