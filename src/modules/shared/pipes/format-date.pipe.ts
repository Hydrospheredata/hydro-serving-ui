import { PipeTransform, Pipe } from '@angular/core';
import format from 'date-fns/format';

@Pipe({
  name: 'hsFormatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(time: number | Date): string {
    return format(new Date(time), 'dd MMM yyyy H:mm:ss');
  }
}
