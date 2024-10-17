import { Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { PostTagComponent } from "../post-tag/post-tag.component";
import { Router, RouterModule } from '@angular/router';
import { Post, PostStatus } from '../post.model';
import { PostService } from '../post.service';
import { PostMediaGridComponent } from "../post-media-grid/post-media-grid.component";
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [PostTagComponent, RouterModule, PostMediaGridComponent, DateAgoPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {

  static TAGS_LIMIT = 5;

  @Input({required: true}) post!: Post;
  @Input() displayFull: boolean = false;

  @Output() onPostMediaSelected: EventEmitter<{post: Post, mediaIndex: number}> = new EventEmitter();

  displayedTags: string[] = [];
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private postService: PostService,
    private authService: AuthService,
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

  clickVote(): void {
    if (!this.authService.hasTokenSet()) {
      // user is not authenticated, request the user to sign in
    }
    else {
      if (this.post.userScore === 0) {
        this.upvote();
      }
      else {
        this.unvote();
      }
    }
  }

  upvote(): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.postService.upvote(this.post.reference).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.post.userScore = 1;
      }
    });
  }

  unvote(): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.postService.unvote(this.post.reference).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.post.userScore = 0;
      }
    });
  }

  /**
   * Approve a PENDING Post
   */
  approve(): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.postService.approve(this.post.reference).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.post.status = PostStatus.APPROVED;
      }
    });
  }

  /**
   * Rejects a PENDING post
   * @returns 
   */
  reject(): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.postService.reject(this.post.reference).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.post.status = PostStatus.REJECTED;
      }
    });
  }
}
