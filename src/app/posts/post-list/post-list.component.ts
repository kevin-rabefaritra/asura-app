import { Component, OnInit, ViewChild } from '@angular/core';
import { PostCardComponent } from "../post-card/post-card.component";
import { PostService } from '../post.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ActivatedRoute } from '@angular/router';
import { NoResultsBlockComponent } from "../../shared/no-results-block/no-results-block.component";
import { MediaGalleryComponent } from "../../shared/media/media-gallery/media-gallery.component";
import { TitleService } from '../../shared/title/title.service';
import { ItemListComponent } from '../../shared/items/item-list/item-list.component';
import { EventCardComponent } from '../../events/event-card/event-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, SpinnerComponent, NoResultsBlockComponent, MediaGalleryComponent, EventCardComponent],
  templateUrl: './../../shared/items/item-list/item-list.component.html',
  styleUrl: './../../shared/items/item-list/item-list.component.css'
})
export class PostListComponent extends ItemListComponent implements OnInit {

  @ViewChild(SpinnerComponent) postLoadingSpinner!: SpinnerComponent;

  constructor(
    private postService: PostService,
    activeRoute: ActivatedRoute,
    titleService: TitleService
  ) {
    super(activeRoute, titleService);
  }

  override fetchItems(): void {
    this.updateTitle();
    this.isLoading.set(true);
    this.postService.findAll(this.page, this.query, this.tag).subscribe({
      next: (value) => {
        this.applyFetchResults(value);
      }
    });
  }
}
