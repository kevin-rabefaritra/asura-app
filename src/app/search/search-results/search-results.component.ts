import { Component } from '@angular/core';
import { ItemListComponent } from '../../shared/items/item-list/item-list.component';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../shared/title/title.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NoResultsBlockComponent } from '../../shared/no-results-block/no-results-block.component';
import { MediaGalleryComponent } from '../../shared/media/media-gallery/media-gallery.component';
import { EventCardComponent } from '../../events/event-card/event-card.component';
import { PostCardComponent } from '../../posts/post-card/post-card.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [PostCardComponent, SpinnerComponent, NoResultsBlockComponent, MediaGalleryComponent, EventCardComponent],
  templateUrl: './../../shared/items/item-list/item-list.component.html',
  styleUrl: './../../shared/items/item-list/item-list.component.css'
})
export class SearchResultsComponent extends ItemListComponent {

  constructor(
    private searchService: SearchService,
    activeRoute: ActivatedRoute,
    titleService: TitleService
  ) {
    super(activeRoute, titleService);
  }

  override fetchItems(): void {
    this.updateTitle();
    this.isLoading.set(true);
    this.searchService.findAll(this.page, this.query, this.tag).subscribe({
      next: (value) => {
        this.appendPage(value);
      }
    });
  }
}
