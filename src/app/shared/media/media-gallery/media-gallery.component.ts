import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../../../posts/post.service';

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  imports: [],
  templateUrl: './media-gallery.component.html',
  styleUrl: './media-gallery.component.css'
})
export class MediaGalleryComponent implements OnInit {

  @Input({required: false}) mediaUris?: string[];
  @Input() selectedIndex: number = 0;

  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  _mediaUris: string[] = [];

  ngOnInit(): void {
    
  }

  dismiss(event: MouseEvent): void {
    // currentTarget property identifies the element to which the event handler has been attached.
    if (event.target === event.currentTarget) {
      this.onDismiss.emit();
    }
  }
}
