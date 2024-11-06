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

  @Input({required: false}) mediaUris!: string[];
  @Input() selectedIndex: number = 0;

  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  _mediaUris: string[] = [];

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    
  }

  dismiss(event: MouseEvent): void {
    // currentTarget property identifies the element to which the event handler has been attached.
    if (event.target === event.currentTarget) {
      this.onDismiss.emit();
    }
  }
}
