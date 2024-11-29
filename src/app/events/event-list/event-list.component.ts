import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { EventService } from '../event.service';
import { ItemListComponent } from '../../shared/items/item-list/item-list.component';
import { TitleService } from '../../shared/title/title.service';
import { NoResultsBlockComponent } from "../../shared/no-results-block/no-results-block.component";
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { MediaGalleryComponent } from "../../shared/media/media-gallery/media-gallery.component";
import { ActivatedRoute } from '@angular/router';
import { NgOption, NgOptionComponent, NgSelectComponent, NgSelectConfig } from '@ng-select/ng-select';
import { Location } from '../../shared/location/location.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';
import { LocationService } from '../../shared/location/location.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventCardComponent, NoResultsBlockComponent, SpinnerComponent, MediaGalleryComponent, NgSelectComponent, NgOptionComponent, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './../../shared/items/item-list/item-list.component.css'
})
export class EventListComponent extends ItemListComponent implements OnDestroy {

  private static SEARCH_INPUT_DELAY_MS = 300;

  locationsLoading: WritableSignal<boolean> = signal(false);
  locations: WritableSignal<Location[]> = signal([]);
  locationNameInput$: Subject<string> = new Subject();

  selectedPeriod: WritableSignal<number> = signal(7);
  selectedLocation: WritableSignal<string> = signal('any');

  constructor(
    private eventService: EventService,
    private locationService: LocationService,
    private config: NgSelectConfig,
    activeRoute: ActivatedRoute,
    titleService: TitleService,
  ) {
    super(activeRoute, titleService);
    this.config.notFoundText = $localize`No results found`;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initCities();
  }

  ngOnDestroy(): void {
    
  }

  override fetchItems(): void {
    this.isLoading.set(true);
    this.eventService.findAll(this.page, this.selectedPeriod(), this.selectedLocation()).subscribe({
      next: (value) => {
        this.applyFetchResults(value);
      }
    });
  }

  /*** Cities */
  private initCities(): void {
    this.locations.set([this.locationService.anyLocation()]);

    this.locationNameInput$.pipe(
      debounceTime(EventListComponent.SEARCH_INPUT_DELAY_MS),
      distinctUntilChanged(),
      tap(() => this.locationsLoading.set(true)),
      switchMap((term: string) =>
        this.locationService.findLocationsByName(term).pipe(
          tap(() => this.locationsLoading.set(false))
        )
      )
    )
    .subscribe({
      next: (result) => {
        this.locations.set(result);
      }
    });
  }
}
