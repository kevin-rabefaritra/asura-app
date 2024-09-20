import { Component, Input, OnInit, signal, Signal } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { PostMediaGalleryComponent } from "../post-media-gallery/post-media-gallery.component";

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostCardComponent, SpinnerComponent, PostMediaGalleryComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {

  @Input({ required: true }) reference!: string;

  post = signal<Post | undefined>(undefined);

  isGalleryDisplayed = signal<boolean>(false);
  selectedMediaIndex = signal<number>(0);

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPost();
  }

  private loadPost(): void {
    this.postService.findByReference(this.reference).subscribe({
      next: (value) => {
        this.post.set(value);
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
