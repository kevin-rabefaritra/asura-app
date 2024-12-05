import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../shared/pagination/page.model";
import { Post } from "./post.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  static GET_URI: string = '/posts';
  static UPVOTE_URI: string = '/upvote';

  constructor(
    private httpClient: HttpClient
  ) {}

  findAll(page: number, query?: string, tag?: string): Observable<Page<Post>> {
    let url = `${PostService.GET_URI}?page=${page}`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    if (query) {
      url += `&query=${query}`;
    }
    return this.httpClient.get<Page<Post>>(url);
  }

  findByReference(reference: string): Observable<Post> {
    return this.httpClient.get<Post>(`${PostService.GET_URI}/${reference}`);
  }

  getMediaUrl(mediaPath: string): string {
    return `${environment.apiUrl}/media/${mediaPath}`;
  }

  upvote(reference: string): Observable<any> {
    return this.httpClient.put<any>(`/posts/${reference}/upvote`, null);
  }

  unvote(reference: string): Observable<any> {
    return this.httpClient.put<any>(`/posts/${reference}/unvote`, null);
  }

  moderate(reference: string, approve: boolean): Observable<any> {
    let url: string = approve ? `/posts/${reference}/approve` : `/posts/${reference}/reject`;
    return this.httpClient.put<any>(url, null);
  }
}