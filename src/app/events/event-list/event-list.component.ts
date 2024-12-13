import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { EventService } from '../event.service';
import { ItemListComponent } from '../../shared/items/item-list/item-list.component';
import { TitleService } from '../../shared/title/title.service';
import { NoResultsBlockComponent } from "../../shared/no-results-block/no-results-block.component";
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { MediaGalleryComponent } from "../../shared/media/media-gallery/media-gallery.component";
import { ActivatedRoute, Router } from '@angular/router';
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

  selectedPeriod: WritableSignal<string> = signal('7');
  selectedLocation: WritableSignal<string> = signal('any');

  currentPeriod: string = '';
  currentLocation: string = '';

  constructor(
    private eventService: EventService,
    private locationService: LocationService,
    private config: NgSelectConfig,
    private router: Router,
    activeRoute: ActivatedRoute,
    titleService: TitleService,
  ) {
    super(activeRoute, titleService);
    this.config.notFoundText = $localize`No results found`;
  }

  override ngOnInit(): void {
    this.initUrlParams();
    this.initLocations();
  }

  private initUrlParams(): void {
    this.activeRoute.queryParams.subscribe(queryParams => {
      // if no parameter is defined in the url, redirect with default values
      if (!queryParams['period'] || !queryParams['location']) {
        this.router.navigate(['/events'], { queryParams: { period: '7', location: 'any' } });
        return;
      }

      let period: string = this.eventService.getPeriodValue(queryParams['period']);
      let location: string = queryParams['location'] || 'any';

      if (this.currentPeriod !== period || this.currentLocation !== location) {
        this.resetList();
        this.currentPeriod = period;
        this.currentLocation = location;

        this.selectedPeriod.set(period);
        this.selectedLocation.set(location);

        // Add fetch locations in case the exact location is already provided in the query parameter
        this.fetchLocations(location);

        // Load items
        this.fetchItems();
      }
    });
  }

  ngOnDestroy(): void {

  }

  override fetchItems(): void {
    this.isLoading.set(true);
    this.eventService.findAll(this.page, this.selectedPeriod(), this.selectedLocation()).subscribe({
      next: (value) => {
        this.appendPage(value);
      }
    });
  }

  protected updateParams(): void {
    this.router.navigate(['/events'], { queryParams: {
      period: this.selectedPeriod(),
      location: this.selectedLocation()
    }});
  }

  /*** Location */
  private initLocations(): void {
    this.locations.set([this.locationService.anyLocation()]);

    this.locationNameInput$.pipe(
      debounceTime(EventListComponent.SEARCH_INPUT_DELAY_MS),
      distinctUntilChanged()
    ).subscribe({ next: (term) => {
        this.fetchLocations(term);
      }
    });
  }

  fetchLocations(term: string): void {
    this.locationsLoading.set(true);
    this.locationService.findLocationsByName(term).subscribe({
      next: (value) => {
        this.locations.set(value);
        this.locationsLoading.set(false);
      }
    });
  }
}
