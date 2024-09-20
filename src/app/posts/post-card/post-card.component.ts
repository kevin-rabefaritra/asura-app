import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostTagComponent } from "../post-tag/post-tag.component";
import { Router, RouterModule } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { PostMediaGridComponent } from "../post-media-grid/post-media-grid.component";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [PostTagComponent, RouterModule, PostMediaGridComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {

  static TAGS_LIMIT = 5;

  @Input({required: true}) post!: Post;
  @Input() displayFull: boolean = false;

  @Output() onPostMediaSelected: EventEmitter<{post: Post, mediaIndex: number}> = new EventEmitter();

  displayedTags: string[] = [];

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.displayedTags = this.displayFull ? this.post.tags : this.post.tags.slice(0, PostCardComponent.TAGS_LIMIT);
  }

  get allTagsDisplayed(): boolean {
    return this.displayedTags.length === this.post.tags.length;
  }

  showAllTags(): void {
    this.displayedTags = this.post.tags;
  }

  showPost(): void {
    this.router.navigate(['/post', this.post.reference]);
  }

  selectMedia(index: number): void {
    this.onPostMediaSelected.emit({post: this.post, mediaIndex: index});
  }
}
