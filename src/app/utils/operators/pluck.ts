import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export function pluck<T, K extends keyof T>(key: K) {
  return (source: Observable<T>) =>
    source.pipe(
      map(val => val[key]),
      distinctUntilChanged()
    );
}
