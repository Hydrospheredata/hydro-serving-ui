import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { IsRootUrlService } from '@app/core/is-root-url.service';

type EntityWithName = { name: string };

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  isRootUrl$: Observable<boolean>;

  private routerEvents$: Observable<Event>;

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
    observable: Observable<T[]>,
    params,
  ) {
    observable
      .pipe(first(entities => entities.length > 0))
      .subscribe(entities => {
        this.router.navigate([`${params}/${entities[0].name}`]);
      });
  }
}
