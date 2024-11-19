import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from "luxon";

@Pipe({
  name: 'dateAgo',
  standalone: true
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      let datetime = DateTime.isDateTime(value) ? value : DateTime.fromISO(value);
      
      let options = {
        locale: $localize.locale
      };

      if (datetime.diffNow(['hours']).hours < 48) {
        // Within 48 hours, we return the relative date / time
        return `${datetime.toRelativeCalendar(options)}, ${datetime.toLocaleString(DateTime.TIME_SIMPLE, options)}`;
      }
      else {
        return datetime.toLocaleString(DateTime.DATETIME_MED, options);
      }
    }
    return value;
  }
}
