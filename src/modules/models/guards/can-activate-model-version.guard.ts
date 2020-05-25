import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ModelsFacade } from '@models/store';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CanActivateModelVersionGuard implements CanActivate {
  constructor(
    private mdlSnackbarService: MdlSnackbarService,
    private router: Router,
    private facade: ModelsFacade
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const modelVersionId = Number(route.params.modelVersionId);
    const modelId = Number(route.params.modelId);

    return this.loaded().pipe(
      switchMap(() => this.facade.getAllModelVersions()),
      switchMap(modelVersions => {
        const modelVersionExists = modelVersions.some(
          modelVersion =>
            modelVersion.id === modelVersionId &&
            modelVersion.model.id === modelId
        );

        if (modelVersionExists) {
          return of(true);
        } else {
          this.showMessage(modelId, modelVersionId);
          this.router.navigate(['models', modelId]);
          return of(false);
        }
      })
    );
  }

  private loaded() {
    return combineLatest([
      this.facade.isModelsLoaded(),
      this.facade.isModelVersionsLoaded(),
    ]).pipe(
      first(
        ([modelsLoaded, modelVersionsLoaded]) =>
          modelsLoaded && modelVersionsLoaded
      )
    );
  }

  private showMessage(modelId, modelVerId) {
    this.mdlSnackbarService.showSnackbar({
      message: `Models version: ${modelVerId} doesn't exist for model with id:${modelId}`,
      timeout: 5000,
    });
  }
}
