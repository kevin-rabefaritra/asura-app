import { Component, HostListener, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { TitleService } from "../../title/title.service";
import { Page } from "../../pagination/page.model";
import { NoResultsBlockComponent } from "../../no-results-block/no-results-block.component";
import { MediaGalleryComponent } from "../../media/media-gallery/media-gallery.component";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { ActivatedRoute } from "@angular/router";
import { PostCardComponent } from "../../../posts/post-card/post-card.component";
import { EventCardComponent } from "../../../events/event-card/event-card.component";
import { ItemType, SearchItem } from "../../../search/search-item.model";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [NoResultsBlockComponent, SpinnerComponent, MediaGalleryComponent, PostCardComponent, EventCardComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export abstract class ItemListComponent implements OnInit {

  constructor(
    protected activeRoute: ActivatedRoute,
    private titleService: TitleService
  ) {}

  items: WritableSignal<any[]> = signal<any[]>([]);
  isLastPage: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  page: number = 0;

  // Gallery
  isGalleryDisplayed = signal(false);
  selectedMediaList = signal<string[]>([]);
  selectedMediaIndex = signal(0);

  // Used by search feature
  query: string = '';
  tag: string = '';

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(queryParams => {
      if (queryParams['q'] !== this.query || queryParams['tag'] !== this.tag) {
        this.query = queryParams['q'];
        this.tag = queryParams['tag'];
        this.resetList();
        this.fetchItems();
      }
    });
  }

  abstract fetchItems(): void;

  resetList(): void {
    this.page = 0;
    this.items.set([]);
  }

  addItems(items: any[]): void {
    this.items.update((list) => list.concat(items));
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  appendPage(page: Page<any>): void {
    this.isLoading.set(false);
    this.addItems(page.content);
    this.isLastPage.set(page.last);
  }

  updatePage(page: Page<any>): void {
    this.isLoading.set(false);
    this.items.set(page.content);
    this.isLastPage.set(page.last);
  }

  dismissGallery(): void {
    this.isGalleryDisplayed.set(false);
  }

  displayGallery(event: {mediaList: string[], mediaIndex: number}): void {
    this.selectedMediaList.set(event.mediaList);
    this.selectedMediaIndex.set(event.mediaIndex);
    this.isGalleryDisplayed.set(true);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowsScroll(): void {
    let margin = 0.9; // Added margin to help detect page last element
    let position = window.innerHeight + window.scrollY;
    let limit = document.body.offsetHeight * margin;

    if (position >= limit && !this.isLoading() && !this.isLastPage()) {
      this.page += 1;
      this.fetchItems();
    }
  }

  /**
   * Update the title based on the parameters
   */
  updateTitle(): void {
    if (this.query) {
      this.setTitle(`${this.query} - ${$localize`search results`}`);
    }
    else if (this.tag) {
      this.setTitle(this.tag);
    }
    else {
      this.setTitle($localize`home`);
    }
  }
}
