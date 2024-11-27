import { Component, OnInit, WritableSignal } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { Event, EventType } from '../event.model';
import { PostStatus } from '../../posts/post.model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  constructor(
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    
  }

  dummyEvent(): Event {
    return this.eventService.dummyEvent();
  }
}
