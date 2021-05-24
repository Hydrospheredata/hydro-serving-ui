import { Pipe, PipeTransform } from '@angular/core';
import { MappedServable, Servable } from '@app/core/data/types';

@Pipe({
  name: 'mappedServable',
})
export class MappedServablePipe implements PipeTransform {
  transform(servable: Servable): MappedServable {
    const mappedServable = {
      fullName: servable.fullName,
      name: servable.name,
      status: servable.status,
      message: servable.message,
    };
    if (servable.status === 'Serving' && servable.message) {
      mappedServable.status = 'Warning';
    }
    if (!servable.status) {
      mappedServable.status = 'Undefined';
    }

    return mappedServable;
  }
}
