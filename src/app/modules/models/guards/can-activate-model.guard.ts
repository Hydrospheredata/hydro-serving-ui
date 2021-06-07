import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { ModelsFacade } from '@app/core/facades/models.facade';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { Model } from '@app/core/data/types';

@Injectable({ providedIn: 'root' })
export class CanActivateModelGuard implements CanActivate {
  constructor(
    private facade: ModelsFacade,
    private modelVersionFacade: ModelVersionsFacade,
    private mdlSnackbarService: MdlSnackbarService,
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
    this.mdlSnackbarService.showSnackbar({
      message: `Models with name = ${modelName} doesn't exist`,
      timeout: 5000,
    });
  }

  private redirectToDefault(): void {
    this.router.navigate(['models']);
  }

  private loaded(): Observable<boolean> {
    return this.facade.areModelsLoaded().pipe(first(loaded => loaded));
  }
}
