import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ModelsFacade } from '@models/store';
import { Model } from '@shared/_index';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CanActivateModelGuard implements CanActivate {
  constructor(
    private facade: ModelsFacade,
    private mdlSnackbarService: MdlSnackbarService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const modelId = Number(route.params.modelId);

    return this.loaded().pipe(
      switchMap(() => this.facade.getAllModels()),
      switchMap(models => {
        const model: Model = models.find(curModel => curModel.id === modelId);

        if (model) {
          return of(true);
        } else {
          this.showMessage(modelId);
          this.redirectToDefault();
          return of(false);
        }
      })
    );
  }

  private showMessage(modelId: number): void {
    this.mdlSnackbarService.showSnackbar({
      message: `Models with id = ${modelId} doesn't exist`,
      timeout: 5000,
    });
  }

  private redirectToDefault(): void {
    this.router.navigate(['models']);
  }

  private loaded(): Observable<boolean> {
    return this.facade.isModelsLoaded().pipe(first(value => value === true));
  }
}
