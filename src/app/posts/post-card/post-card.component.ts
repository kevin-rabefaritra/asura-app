import { Component, ElementRef, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { PostTagComponent } from "../post-tag/post-tag.component";
import { Router, RouterModule } from '@angular/router';
import { Post, PostStatus } from '../post.model';
import { PostService } from '../post.service';
import { PostMediaGridComponent } from "../post-media-grid/post-media-grid.component";
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { AuthService } from '../../auth/auth.service';
import { NgOptimizedImage } from '@angular/common'
import { ToastService } from '../../shared/toast/toast.service';
import { SummaryFormatPipe } from "../../pipes/summary-format.pipe";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [PostTagComponent, RouterModule, PostMediaGridComponent, DateAgoPipe, NgOptimizedImage, SummaryFormatPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {

  // Maximum number of tags displayed by default
  static TAGS_LIMIT = 5;
  static HIGHLIGHT_VISIBLE_THRESHOLD = 0.75;

  @Input({required: true}) post!: Post;
  @Input() displayFull: boolean = false;

  @Output() onPostMediaSelected: EventEmitter<{post: Post, mediaIndex: number}> = new EventEmitter();

  displayedTags: string[] = [];
  isLoading: WritableSignal<boolean> = signal(false);
  hasUserFocus: WritableSignal<boolean> = signal(false);

  private intersectionObserver?: IntersectionObserver;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    let postTags = this.post.tags || [];
    this.displayedTags = this.displayFull ? postTags : postTags.slice(0, PostCardComponent.TAGS_LIMIT);
    this.initIntersectionObserver();
  }

  /**
   * Initializes the intersection observer
   * Post is highlighted when 80% visible on screen
   */
  initIntersectionObserver(): void {
    const options = {
      root: null,
      threshold: [PostCardComponent.HIGHLIGHT_VISIBLE_THRESHOLD]
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.hasUserFocus.set(entry.intersectionRatio >= PostCardComponent.HIGHLIGHT_VISIBLE_THRESHOLD);
      });
    }, options);
    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  get allTagsDisplayed(): boolean {
    return !this.post.tags || this.displayedTags.length === this.post.tags.length;
  }

  showAllTags(): void {
    this.displayedTags = this.post.tags || [];
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
      this.toastService.notify('Sign in to upvote posts!');
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
