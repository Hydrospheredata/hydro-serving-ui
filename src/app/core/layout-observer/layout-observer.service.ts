import { ElementRef, Inject, Injectable, InjectionToken } from '@angular/core';
import { EngBreakpoints, MediaQueries } from './breakpoints';
import { Observable } from 'rxjs';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { coerceElement } from '@angular/cdk/coercion';
import { map, pairwise, startWith, tap } from 'rxjs/operators';

/**
 * Токен для инъекции {@link MediaQueries}
 */
export const MEDIA_QUERIES = new InjectionToken<Map<EngBreakpoints, string>>(
  'MEDIA QUERIES',
  {
    providedIn: 'root',
    factory() {
      return MediaQueries;
    },
  },
);

@Injectable({
  providedIn: 'root',
})
export class LayoutObserver {
  private readonly breakpoints: Observable<EngBreakpoints[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaMatcher: MediaMatcher,
    @Inject(MEDIA_QUERIES) private mediaQueries: Map<EngBreakpoints, string>,
  ) {
    this.breakpoints = breakpointObserver
      .observe([...this.mediaQueries.values()])
      .pipe(
        map(() => {
          return [...this.mediaQueries.entries()]
            .filter(([_, value]) => mediaMatcher.matchMedia(value).matches)
            .map(([key]) => key);
        }),
      );
  }

  /**
   * Делает инъекцию классов, которые соответсвуют текущему вьюпорту,
   * в переданный пользовательский элемент
   */
  public injectTo(
    element: HTMLElement | ElementRef<HTMLElement>,
  ): Observable<EngBreakpoints[]> {
    const htmlElement = coerceElement<HTMLElement>(element);
    return this.observe().pipe(
      startWith<EngBreakpoints[]>([]),
      pairwise(),
      tap(([previous, current]) => {
        const prevSet = new Set(previous);
        current.forEach(key => prevSet.delete(key));

        const currSet = new Set(current);
        previous.forEach(key => currSet.delete(key));

        /* передаем по одному элементу, тк IE не поддерживает несколько */

        const prev = [...prevSet.values()];
        prev.forEach(c => htmlElement.classList.remove(c));

        const curr = [...currSet.values()];
        curr.forEach(c => htmlElement.classList.add(c));
      }),
      map(([_, current]) => current),
    );
  }

  /**
   * Возвращает Observable, который испускает текущие брейкпоинты при изменении вьюпорта
   */
  public observe(): Observable<EngBreakpoints[]> {
    return this.breakpoints;
  }
}
