import { Pipe, PipeTransform } from '@angular/core';
import { compose } from 'lodash/fp';
@Pipe({
  name: 'checkIdToTime',
})
export class CheckIdToTimePipe implements PipeTransform {
  transform(value: string) {
    if (value) {
      const getFirst4Bytes = str => str.slice(0, 8);
      const converToMicroseconds = str => parseInt(str, 16) * 1000;
      const convertToDate = ms => new Date(ms);

      return compose(
        convertToDate,
        converToMicroseconds,
        getFirst4Bytes
      )(value);
    }

    return value;
  }
}
