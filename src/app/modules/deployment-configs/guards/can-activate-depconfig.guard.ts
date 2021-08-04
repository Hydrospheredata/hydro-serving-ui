import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { Store } from '@ngrx/store';
import { NotifyWarning } from '@app/core/store/actions/notifications.actions';

@Injectable({
  providedIn: 'root',
})
export class CanActivateDeploymentConfigGuard implements CanActivate {
  constructor(
    private facade: DeploymentConfigsFacade,
    private router: Router,
    private store: Store,
  ) {}

  canActivate(routerSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return this.loaded().pipe(
      switchMap(() => this.facade.getAll()),
      switchMap(depconfigs => {
        const depConfigName = routerSnapshot.params.name;
        const depConfigExist = depconfigs.some(
          ({ name }) => name === depConfigName,
        );

        if (depConfigExist) {
          return of(true);
        } else {
          this.showMessage(depConfigName);
          this.redirect();
          return of(false);
        }
      }),
    );
  }

  private redirect(): void {
    this.router.navigate(['/deployment_configs']);
  }

  private showMessage(name: string): void {
    this.store.dispatch(
      NotifyWarning(`Deployment config with name: ${name} doesn't exist`),
    );
  }

  private loaded(): Observable<boolean> {
    return this.facade.areDepConfigsLoaded().pipe(first(loaded => loaded));
  }
}
