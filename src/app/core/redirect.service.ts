import { Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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
      map((event: RouterEvent) => this.rootUrlService.isRootUrl(event)),
    );
  }

  public redirectToFirst<T extends EntityWithName>(
    entities$: Observable<T[]>,
    params,
  ) {
    this.redirectToFirstEntity = combineLatest([this.isRootUrl$, entities$])
      .pipe(
        filter(([isRoot]) => isRoot),
        tap(([_, entities]) => entities.length > 0),
      )
      .subscribe(([_, entities]) => {
        this.router.navigate([`${params}/${entities[0].name}`]);
      });
  }

  ngOnDestroy() {
    this.redirectToFirstEntity.unsubscribe();
  }
}
