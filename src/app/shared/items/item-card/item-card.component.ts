import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateAgoPipe } from '../../../pipes/date-ago.pipe';
import { AuthService } from '../../../auth/auth.service';
import { ToastService } from '../../toast/toast.service';
import { ItemTagComponent } from '../item-tag/item-tag.component';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule, DateAgoPipe, ItemTagComponent],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent implements OnInit {

  @Output() onApproved: EventEmitter<any> = new EventEmitter();
  @Output() onRejected: EventEmitter<any> = new EventEmitter();

  @Input({required: true}) item!: any;
  @Input({required: false}) isLoading: boolean = false;

  // Maximum number of tags displayed by default
  static TAGS_LIMIT = 5;
  static HIGHLIGHT_VISIBLE_THRESHOLD = 0.75;

  @Input() displayFull: boolean = false;

  displayedTags: string[] = [];
  hasUserFocus: WritableSignal<boolean> = signal(false);

  private intersectionObserver?: IntersectionObserver;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    let tags = this.item.tags || [];
    this.displayedTags = this.displayFull ? tags : tags.slice(0, ItemCardComponent.TAGS_LIMIT);
    this.initIntersectionObserver();
  }

  /**
   * Initializes the intersection observer
   * Card is highlighted when 80% visible on screen
   */
  initIntersectionObserver(): void {
    const options = {
      root: null,
      threshold: [ItemCardComponent.HIGHLIGHT_VISIBLE_THRESHOLD]
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.hasUserFocus.set(entry.intersectionRatio >= ItemCardComponent.HIGHLIGHT_VISIBLE_THRESHOLD);
      });
    }, options);
    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  showAllTags(): void {
    this.displayedTags = this.item.tags || [];
  }

  get allTagsDisplayed(): boolean {
    return !this.item.tags || this.displayedTags.length === this.item.tags.length;
  }

  clickVote(): void {
    if (!this.authService.hasTokenSet()) {
      // user is not authenticated, request the user to sign in
      this.toastService.notify($localize`Sign in to upvote posts!`);
    }
    else {
      if (this.item.userScore === 0) {
        // this.upvote();
      }
      else {
        // this.unvote();
      }
    }
  }

  /**
   * Approve a PENDING Post
   */
  approve(): void {
    this.onApproved.emit();
  }

  /**
   * Rejects a PENDING post
   * @returns 
   */
  reject(): void {
    this.onRejected.emit();
  }
}
