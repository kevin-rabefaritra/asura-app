import { Injectable } from "@angular/core";
import { Event, EventType } from "./event.model";
import { PostStatus } from "../posts/post.model";
import { Observable, of } from "rxjs";
import { Page } from "../shared/pagination/page.model";
import { HttpClient } from "@angular/common/http";
import { SearchItem } from "../search/search-item.model";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private static GET_URI = "/events";
  static PERIOD_ACCEPTED_VALUES = ['7', '14', '21'];

  constructor(
    private httpClient: HttpClient
  ) {}

  findAll(page: number, period: string, location: string): Observable<Page<SearchItem>> {
    return this.httpClient.get<Page<SearchItem>>(`${EventService.GET_URI}?page=${page}&period=${period}&location=${location}`);
  }

  findByReference(reference: string): Observable<Event> {
    return this.httpClient.get<Event>(`${EventService.GET_URI}/${reference}`);
  }

  getPeriodValue(period: string): string {
    if (EventService.PERIOD_ACCEPTED_VALUES.includes(period)) {
      return period;
    }
    return EventService.PERIOD_ACCEPTED_VALUES[0];
  }
}