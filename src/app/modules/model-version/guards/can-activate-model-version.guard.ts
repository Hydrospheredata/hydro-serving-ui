import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { ModelsFacade } from '@app/core/facades/models.facade';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { Store } from '@ngrx/store';
import { NotifyWarning } from '@app/core/store/actions/notifications.actions';

@Injectable({ providedIn: 'root' })
export class CanActivateModelVersionGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private modelsFacade: ModelsFacade,
    private modelVersionsFacade: ModelVersionsFacade,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const modelVersionNumber = Number(route.params.modelVersionNumber);
    const modelName = route.params.modelName;

    return this.loaded().pipe(
      switchMap(() => this.modelVersionsFacade.allModelVersions()),
      switchMap(modelVersions => {
        const modelVersionExists = modelVersions.some(
          modelVersion =>
            modelVersion.modelVersion === modelVersionNumber &&
            modelVersion.model.name === modelName,
        );

        if (modelVersionExists) {
          return of(true);
        } else {
          this.showMessage(modelName, modelVersionNumber);
          this.router.navigate(['models', modelName]);
          return of(false);
        }
      }),
    );
  }

  private loaded() {
    return combineLatest([
      this.modelsFacade.areModelsLoaded(),
      this.modelVersionsFacade.areModelVersionsLoaded(),
    ]).pipe(
      first(
        ([modelsLoaded, modelVersionsLoaded]) =>
          modelsLoaded && modelVersionsLoaded,
      ),
    );
  }

  private showMessage(modelName: string, modelVersionNumber: number): void {
    this.store.dispatch(
      NotifyWarning(
        `Models version: ${modelVersionNumber} doesn't exist for model with name:${modelName}`,
      ),
    );
  }
}
