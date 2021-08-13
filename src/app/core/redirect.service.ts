import { Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, takeWhile, tap } from 'rxjs/operators';
import { IsRootUrlService } from '@app/core/is-root-url.service';

type EntityWithName = { name: string };

@Injectable({
  providedIn: 'root',
})
export class RedirectService implements OnDestroy {
  isRootUrl$: Observable<boolean>;

  private routerEvents$: Observable<Event>;
  private redirectToFirstEntity: Subscription;

  constructor(
    private router: Router,
    private rootUrlService: IsRootUrlService,
  ) {
    this.routerEvents$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    );
    this.isRootUrl$ = this.routerEvents$.pipe(
      map((event: RouterEvent) => {
        return this.rootUrlService.isRootUrl(event);
      }),
    );
  }

  public redirectToFirst<T extends EntityWithName>(
    entities$: Observable<T[]>,
    entityUri,
  ) {
    this.redirectToFirstEntity = combineLatest([this.routerEvents$, entities$])
      .pipe(
        filter(([event]) =>
          this.rootUrlService.isRootUrl(event as RouterEvent),
        ),
        takeWhile(([event]) =>
          this.sameUri(this.extractUriName(event as NavigationEnd), entityUri),
        ),
      )
      .subscribe(([_, entities]) => {
        entities.length
          ? this.router.navigate([`${entityUri}/${entities[0].name}`])
          : this.router.navigate([`${entityUri}`]);
      });
  }

  ngOnDestroy() {
    this.redirectToFirstEntity.unsubscribe();
  }

  private sameUri(navigaterUri: string, settedUri: string): boolean {
    return navigaterUri == settedUri;
  }

  private extractUriName(event: NavigationEnd): string {
    return (event as NavigationEnd).urlAfterRedirects.split('/').filter(_ => _)[0];
  }
}
