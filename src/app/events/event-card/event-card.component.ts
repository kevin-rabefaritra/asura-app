import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Event } from '../event.model';
import { SummaryFormatPipe } from "../../pipes/summary-format.pipe";
import { PostMediaGridComponent } from "../../posts/post-media-grid/post-media-grid.component";
import { DateAgoPipe } from "../../pipes/date-ago.pipe";
import { PostTagComponent } from '../../posts/post-tag/post-tag.component';
import { PostCardComponent } from '../../posts/post-card/post-card.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage, SummaryFormatPipe, PostMediaGridComponent, DateAgoPipe, DatePipe, PostTagComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {

  @Input({required: true}) event!: Event;
  @Input({required: false}) displayFull: boolean = false;

  isLoading: WritableSignal<boolean> = signal(false);

  displayedTags: string[] = [];

  ngOnInit(): void {
    let eventTags = this.event.tags || [];
    this.displayedTags = this.displayFull ? eventTags : eventTags.slice(0, PostCardComponent.TAGS_LIMIT);
  }

  clickVote(): void {

  }

  reject(): void {

  }

  approve(): void {

  }

  showAllTags(): void {
    this.displayedTags = this.event.tags || [];
  }

  get allTagsDisplayed(): boolean {
    return !this.event.tags || this.displayedTags.length === this.event.tags.length;
  }

  showEvent(): void {

  }

  selectMedia(index: number): void {
    
  }
}
