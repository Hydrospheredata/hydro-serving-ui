import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { ApplicationsFacade } from '@applications/store';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CanActivateApplicationGuard implements CanActivate {
  constructor(
    private facade: ApplicationsFacade,
    private router: Router,
    public mdlSnackbarService: MdlSnackbarService
  ) {}

  canActivate(routerSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return this.loaded().pipe(
      switchMap(() => this.facade.allApplications$),
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
      })
    );
  }

  private redirect(): void {
    this.router.navigate(['/applications']);
  }

  private showMessage(name: string): void {
    this.mdlSnackbarService.showSnackbar({
      message: `Application with name: ${name} doesn't exist`,
      timeout: 5000,
    });
  }

  private loaded(): Observable<boolean> {
    return this.facade.applicationsLoaded$.pipe(first(loaded => loaded));
  }
}
