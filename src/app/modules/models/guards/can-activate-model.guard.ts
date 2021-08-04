import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { ModelsFacade } from '@app/core/facades/models.facade';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { Model } from '@app/core/data/types';
import { Store } from '@ngrx/store';
import { NotifyWarning } from '@app/core/store/actions/notifications.actions';

@Injectable({ providedIn: 'root' })
export class CanActivateModelGuard implements CanActivate {
  constructor(
    private facade: ModelsFacade,
    private modelVersionFacade: ModelVersionsFacade,
    private store: Store,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const modelName = route.params.modelName;

    return this.loaded().pipe(
      switchMap(() => this.facade.allModels()),
      switchMap(models => {
        const model: Model = models.find(
          curModel => curModel.name === modelName,
        );

        if (model) {
          return of(true);
        } else {
          this.showMessage(modelName);
          this.redirectToDefault();
          return of(false);
        }
      }),
    );
  }

  private showMessage(modelName: string): void {
    this.store.dispatch(
      NotifyWarning(`Models with name = ${modelName} doesn't exist`),
    );
  }

  private redirectToDefault(): void {
    this.router.navigate(['models']);
  }

  private loaded(): Observable<boolean> {
    return this.facade.areModelsLoaded().pipe(first(loaded => loaded));
  }
}
