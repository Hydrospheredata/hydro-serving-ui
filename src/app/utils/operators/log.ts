import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

export function log<T>(source: Observable<T>): Observable<T> {
  return source.pipe(tap(value => console.log(value)));
}
