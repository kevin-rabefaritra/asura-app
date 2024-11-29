import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { TitleService } from '../../shared/title/title.service';
import { EventCardComponent } from "../event-card/event-card.component";
import { ItemDetailsComponent } from "../../shared/items/item-details/item-details.component";
import { ItemDetails } from '../../shared/items/item-details/item-details';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [EventCardComponent, ItemDetailsComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent extends ItemDetails<Event> {

  @Input({ required: true }) reference!: string;

  constructor(
    private eventService: EventService,
    private titleService: TitleService
  ) {
    super();
  }

  override fetch(): void {
    this.isLoading.set(true);
    this.eventService.findByReference(this.reference).subscribe({
      next: (value) => {
        this.isLoading.set(false);
        this.item.set(value);
        this.titleService.setTitle(this.item()?.title || '');
      },
      error: (err) => {
        if (err.status === 404) {
          this.isLoading.set(false);
        }
      }
    });
  }
}
