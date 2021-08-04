import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { Store } from '@ngrx/store';
import { NotifyWarning } from '@app/core/store/actions/notifications.actions';

@Injectable({
  providedIn: 'root',
})
export class CanActivateApplicationGuard implements CanActivate {
  constructor(
    private facade: ApplicationsFacade,
    private router: Router,
    private store: Store,
  ) {}

  canActivate(routerSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return this.loaded().pipe(
      switchMap(() => this.facade.allApplications()),
      switchMap(apps => {
        const applicationName = routerSnapshot.params.name;
        const appExist = apps.some(({ name }) => name === applicationName);

        if (appExist) {
          return of(true);
        } else {
          this.showMessage(applicationName);
          this.redirect();
          return of(false);
        }
      }),
    );
  }

  private redirect(): void {
    this.router.navigate(['/applications']);
  }

  private showMessage(name: string): void {
    this.store.dispatch(
      NotifyWarning(`Application with name: ${name} doesn't exist`),
    );
  }

  private loaded(): Observable<boolean> {
    return this.facade.areApplicationsLoaded().pipe(first(loaded => loaded));
  }
}
