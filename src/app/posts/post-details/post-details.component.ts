import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { TitleService } from '../../shared/title/title.service';
import { ItemDetailsComponent } from '../../shared/items/item-details/item-details.component';
import { ItemDetails } from '../../shared/items/item-details/item-details';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostCardComponent, ItemDetailsComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent extends ItemDetails<Post> {

  @Input({ required: true }) reference!: string;

  constructor(
    private postService: PostService,
    private titleService: TitleService
  ) {
    super();
  }

  override fetch(): void {
    this.isLoading.set(true);
    this.postService.findByReference(this.reference).subscribe({
      next: (value) => {
        this.isLoading.set(false);
        this.item.set(value);
        this.titleService.setTitle(`${this.item()?.authorName} - ${this.item()?.summary}`);
      },
      error: (err) => {
        if (err.status === 404) {
          this.isLoading.set(false);
        }
      }
    });
  }
}
