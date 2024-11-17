import { Component, Input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { PostMediaGalleryComponent } from "../post-media-gallery/post-media-gallery.component";
import { TitleService } from '../../shared/title/title.service';
import { NoResultsBlockComponent } from "../../shared/no-results-block/no-results-block.component";

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostCardComponent, SpinnerComponent, PostMediaGalleryComponent, NoResultsBlockComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {

  @Input({ required: true }) reference!: string;

  post = signal<Post | undefined>(undefined);
  isLoading: WritableSignal<boolean> = signal(true);

  isGalleryDisplayed = signal<boolean>(false);
  selectedMediaIndex = signal<number>(0);

  constructor(
    private postService: PostService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.loadPost();
  }

  private loadPost(): void {
    this.isLoading.set(true);
    this.postService.findByReference(this.reference).subscribe({
      next: (value) => {
        this.isLoading.set(false);
        this.post.set(value);
        this.titleService.setTitle(`${this.post()?.authorName} - ${this.post()?.summary}`);
      },
      error: (err) => {
        if (err.status === 404) {
          this.isLoading.set(false);
        }
      }
    });
  }

  dismissGallery(): void {
    this.isGalleryDisplayed.set(false);
  }
  
  displayGallery(mediaIndex: number): void {
    this.selectedMediaIndex.set(mediaIndex);
    this.isGalleryDisplayed.set(true);
  }
}
