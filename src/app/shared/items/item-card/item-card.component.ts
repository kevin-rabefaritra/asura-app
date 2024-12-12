import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateAgoPipe } from '../../../pipes/date-ago.pipe';
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
  @Output() onCopy: EventEmitter<any> = new EventEmitter();

  @Input({required: true}) item!: any;
  @Input({required: false}) isLoading: boolean = false;

  // Maximum number of tags displayed by default
  static TAGS_LIMIT = 5;
  static HIGHLIGHT_VISIBLE_THRESHOLD = 0.75;

  @Input() displayFull: boolean = false;

  displayedTags: string[] = [];
  hasUserFocus: WritableSignal<boolean> = signal(false);
  profilePictureLoaded: WritableSignal<boolean> = signal(false);

  private intersectionObserver?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef
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

  onProfilePictureLoaded(): void {
    this.profilePictureLoaded.set(true);
  }

  showAllTags(): void {
    this.displayedTags = this.item.tags || [];
  }

  get allTagsDisplayed(): boolean {
    return !this.item.tags || this.displayedTags.length === this.item.tags.length;
  }

  copyToClipboard(): void {
    this.onCopy.emit();
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
