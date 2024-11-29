import { Injectable } from "@angular/core";
import { Event, EventType } from "./event.model";
import { PostStatus } from "../posts/post.model";
import { Observable, of } from "rxjs";
import { Page } from "../shared/pagination/page.model";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private static GET_URI = "/events";

  constructor(
    private httpClient: HttpClient
  ) {}

  findAll(page: number, period: number, location: string): Observable<Page<Event>> {
    return this.httpClient.get<Page<Event>>(`${EventService.GET_URI}?page=${page}&period=${period}&location=${location}`);
  }

  findByReference(reference: string): Observable<Event> {
    return this.httpClient.get<Event>(`${EventService.GET_URI}/${reference}`);
  }
}