import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Post, PostStatus } from '../post.model';
import { SummaryFormatPipe } from "../../pipes/summary-format.pipe";
import { MediaGridComponent } from '../../shared/media/media-grid/media-grid.component';
import { ItemCardComponent } from "../../shared/items/item-card/item-card.component";
import { PostService } from '../post.service';

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

  isLoading: WritableSignal<boolean> = signal(false);

  @Output() onMediaSelected: EventEmitter<{mediaList: string[], mediaIndex: number}> = new EventEmitter();

  constructor(
    private router: Router,
    private postService: PostService
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

  moderate(approve: boolean): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.postService.moderate(this.post.reference, approve).subscribe({
      next: (value) => {
        this.isLoading.set(false);
        this.post = value;
      }
    });
  }
}
