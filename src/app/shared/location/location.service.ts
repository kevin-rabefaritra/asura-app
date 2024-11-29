import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Location } from "./location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  static GET_CITIES_URI: string = '/location/cities';
  static KEYWORD_MIN_LENGTH = 3;

  constructor(
    private httpClient: HttpClient
  ) {}

  findLocationsByName(name: string): Observable<Location[]> {
    if (!name || name.length < LocationService.KEYWORD_MIN_LENGTH) {
      return of([this.anyLocation()]);
    }
    return this.httpClient.get<Location[]>(`${LocationService.GET_CITIES_URI}?q=${name}`);
  }

  anyLocation(): Location {
    return { name: $localize`Any`, code: 'any' };
  }
}