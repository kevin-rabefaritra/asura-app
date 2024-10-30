import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-media-gallery',
  standalone: true,
  imports: [],
  templateUrl: './post-media-gallery.component.html',
  styleUrl: './post-media-gallery.component.css'
})
export class PostMediaGalleryComponent implements OnInit {

  @Input({required: false}) mediaUrls!: { url: string, tags: string[] }[];
  @Input() selectedIndex: number = 0;

  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  _mediaUrls: { url: string, tags: string[] }[] = [];

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadMedia();
  }

  loadMedia(): void {
    this._mediaUrls = this.mediaUrls.map(item => {
      return {
        url: item.url,
        tags: item.tags
      }
    });
  }

  dismiss(event: MouseEvent): void {
    // currentTarget property identifies the element to which the event handler has been attached.
    if (event.target === event.currentTarget) {
      this.onDismiss.emit();
    }
  }
}
