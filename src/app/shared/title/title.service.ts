import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class TitleService extends TitleStrategy {

  constructor(private readonly title: Title) {
    super();
  }
  
  override updateTitle(snapshot: RouterStateSnapshot): void {
    let title = this.buildTitle(snapshot);
    if (title) {
      this.setTitle(title);
    }
  }

  setTitle(title: string): void {
    this.title.setTitle(`.1 | ${title}`);
  }
}