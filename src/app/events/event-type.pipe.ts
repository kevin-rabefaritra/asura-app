import { Pipe, PipeTransform } from "@angular/core";
import { EventType } from "./event.model";

@Pipe({
  name: 'eventType',
  standalone: true
})
export class EventTypePipe implements PipeTransform {
  
  transform(value: EventType, ...args: any[]) {
    switch(value) {
      case EventType.ART_ENTERTAINMENT:
        return $localize`Art / Entertainment`;
      case EventType.MUSIC_PERFORMANCE:
        return $localize`Music / Performance`;
      case EventType.SPORT_FITNESS:
        return $localize`Sport / Fitness`;
      case EventType.EDUCATION_NETWORKING:
        return $localize`Education / Networking`;
      case EventType.FOOD_LIFESTYLE:
        return $localize`Food / Lifestyle`;
      default:
        return 'N/A';
    }
  }
}