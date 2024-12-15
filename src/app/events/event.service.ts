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

  constructor(
    private httpClient: HttpClient
  ) {}

  findAll(page: number, location: string): Observable<Page<SearchItem>> {
    return this.httpClient.get<Page<SearchItem>>(`${EventService.GET_URI}?page=${page}&location=${location}`);
  }

  findByReference(reference: string): Observable<Event> {
    return this.httpClient.get<Event>(`${EventService.GET_URI}/${reference}`);
  }

  moderate(reference: string, approve: boolean): Observable<Event> {
    let url: string = approve ? `/events/${reference}/approve` : `/events/${reference}/reject`;
    return this.httpClient.put<Event>(url, null);
  }
}