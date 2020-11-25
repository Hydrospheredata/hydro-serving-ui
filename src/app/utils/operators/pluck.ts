import { Observable } from '@node_modules/rxjs';
import {
  map,
  distinctUntilChanged,
} from '@node_modules/rxjs/internal/operators';

export function pluck<T, K extends keyof T>(key: K) {
  return (source: Observable<T>) =>
    source.pipe(
      map(val => val[key]),
      distinctUntilChanged()
    );
}
