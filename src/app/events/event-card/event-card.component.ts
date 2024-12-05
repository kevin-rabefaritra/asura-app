import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Event } from '../event.model';
import { SummaryFormatPipe } from "../../pipes/summary-format.pipe";
import { MediaGridComponent } from '../../shared/media/media-grid/media-grid.component';
import { ItemCardComponent } from "../../shared/items/item-card/item-card.component";
import { EventTypePipe } from '../event-type.pipe';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterModule, SummaryFormatPipe, MediaGridComponent, DatePipe, ItemCardComponent, EventTypePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {

  @Input({required: true}) event!: Event;
  @Input({required: false}) displayFull: boolean = false;

  @Output() onMediaSelected: EventEmitter<{mediaList: string[], mediaIndex: number}> = new EventEmitter();

  isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private eventService: EventService
  ) {}

  ngOnInit(): void {
  }

  showEvent(): void {
  }

  selectMedia(index: number): void {
    if (!this.event.mediaUris) {
      return;
    }
    this.onMediaSelected.emit({mediaList: this.event.mediaUris, mediaIndex: index});
  }

  moderate(approve: boolean): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.eventService.moderate(this.event.reference, approve).subscribe({
      next: (value) => {
        this.isLoading.set(false);
        this.event = value;
      }
    });
  }
}
