import { Observable } from '@node_modules/rxjs';
import { tap } from '@node_modules/rxjs/internal/operators';

export function log<T>(source: Observable<T>): Observable<T> {
  return source.pipe(tap(value => console.log(value)));
}
