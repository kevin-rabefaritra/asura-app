import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../shared/pagination/page.model";
import { Post } from "./post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  static GET_URI: string = 'http://localhost:8080/api/posts';

  constructor(
    private httpClient: HttpClient
  ) {}

  findAll(page: number): Observable<Page<Post>> {
    return this.httpClient.get<Page<Post>>(`${PostService.GET_URI}?page=${page}`);
  }

  getMediaUrl(mediaPath: string): string {
    return `http://localhost:8080/api/media/${mediaPath}`;
  }
}