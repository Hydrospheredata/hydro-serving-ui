import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { ApplicationsFacade } from '@applications/store';
import { Application } from '@shared/_index';
import { Observable, of } from 'rxjs';
import { filter, take, switchMap } from 'rxjs/operators';
@Injectable()
export class ApplicationsGuard implements CanActivateChild {
  private defaultUrl: string = '/applications';
  private applications$: Observable<Application[]> = this.facade.allApplications$;
  constructor(
    private facade: ApplicationsFacade,
    private router: Router,
    public mdlSnackbarService: MdlSnackbarService
  ) {}

  canActivateChild(
    routerSnapshot: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return this.applicationsAreLoaded().pipe(
      switchMap(_ => this.applications$),
      switchMap((applications: Application[]) => {
        const applicationName = routerSnapshot.params.name;
        const application: Application = applications.find(
          app => app.name === applicationName
        );

        if (application) {
          return of(true);
        } else {
          this.router.navigate([this.defaultUrl]);
          this.mdlSnackbarService.showSnackbar({
            message: `Application with name: ${applicationName} doesn't exist`,
            timeout: 5000,
          });
          return of(false);
        }
      })
    );
  }

  private applicationsAreLoaded(): Observable<boolean> {
    return this.facade.applicationsLoaded$.pipe(
      filter(loaded => loaded),
      take(1)
    );
  }
}
