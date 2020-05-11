import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export function neitherNullNorUndefined<T>(
  source: Observable<T>
): Observable<T> {
  return source.pipe(filter(val => val !== null && val !== undefined));
}
