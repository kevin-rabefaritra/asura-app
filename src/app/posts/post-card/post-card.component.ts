import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Post } from '../post.model';
import { SummaryFormatPipe } from "../../pipes/summary-format.pipe";
import { MediaGridComponent } from '../../shared/media/media-grid/media-grid.component';
import { ItemCardComponent } from "../../shared/items/item-card/item-card.component";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterModule, MediaGridComponent, SummaryFormatPipe, ItemCardComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

  @Input({required: true}) post!: Post;
  @Input() displayFull: boolean = false;

  @Output() onMediaSelected: EventEmitter<{mediaList: string[], mediaIndex: number}> = new EventEmitter();

  constructor(
    private router: Router
  ) {}

  showPost(): void {
    this.router.navigate(['/posts', this.post.reference]);
  }

  selectMedia(index: number): void {
    if (!this.post.mediaUris) {
      return;
    }
    this.onMediaSelected.emit({ mediaList: this.post.mediaUris, mediaIndex: index });
  }
}
