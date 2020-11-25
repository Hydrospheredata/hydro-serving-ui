import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck',
})
export class PluckPipe implements PipeTransform {
  transform<T, K extends keyof T>(value: T, key: K): T[K] {
    return value[key];
  }
}
