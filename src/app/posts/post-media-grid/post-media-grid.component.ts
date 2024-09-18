import { Component, Input } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-media-grid',
  standalone: true,
  imports: [],
  templateUrl: './post-media-grid.component.html',
  styleUrl: './post-media-grid.component.css'
})
export class PostMediaGridComponent {

  @Input({required: true}) mediaFiles: {path: string, tags: string[]}[] = [];

  constructor(
    private postService: PostService
  ) {}

  mediaUrl(mediaPath: string): string {
    return this.postService.getMediaUrl(mediaPath);
  }
}
