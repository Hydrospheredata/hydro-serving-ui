import { PipeTransform, Pipe } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'hsTimeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(time: number | Date | string): string {
    return formatDistance(new Date(time), new Date());
  }
}
