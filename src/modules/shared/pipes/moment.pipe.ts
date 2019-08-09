import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  transform(timestamp: string) {
    return moment(timestamp, 'x').format('MMM DD YYYY hh:mm:ss a');
  }
}
