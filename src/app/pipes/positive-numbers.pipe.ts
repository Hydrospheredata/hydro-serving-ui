import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positiveNumbers'
})
export class PositiveNumbersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.serviceId;
  }

}
