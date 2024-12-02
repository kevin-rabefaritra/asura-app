import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../shared/pagination/page.model";
import { SearchItem } from "./search-item.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  static GET_URI: string = '/search';

  constructor(
    private httpClient: HttpClient
  ) {}

  findAll(page: number, query?: string, tag?: string): Observable<Page<SearchItem>> {
    let url = `${SearchService.GET_URI}?page=${page}`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    if (query) {
      url += `&q=${query}`;
    }
    return this.httpClient.get<Page<SearchItem>>(url);
  }
}