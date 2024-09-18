import { Component, Input, OnInit } from '@angular/core';
import { PostTagComponent } from "../post-tag/post-tag.component";
import { RouterModule } from '@angular/router';
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

  displayedTags: string[] = [];

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.displayedTags = this.post.tags.slice(0, PostCardComponent.TAGS_LIMIT);
  }

  get allTagsDisplayed(): boolean {
    return this.displayedTags.length === this.post.tags.length;
  }

  showAllTags(): void {
    this.displayedTags = this.post.tags;
  }
}
