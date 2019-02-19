import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';
import { Model } from '@shared/_index';
import { Observable ,  forkJoin ,  of } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class ModelVersionDetailsGuard implements CanActivate {
    private defaultUrl: string = 'models';

    constructor(
        private store: Store<fromModels.ModelsState>,
        private mdlSnackbarService: MdlSnackbarService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const modelId = Number(route.params.modelId);

        return forkJoin(
            this.modelsAreLoaded(),
            this.modelVersionAreLoaded()
        ).pipe(
            switchMap(_ => this.store.select(fromModels.getAllModels)),
            switchMap(models => {
                const model: Model = models.find(curModel => curModel.id === modelId);
                if (model) {
                    if (route.params.modelVersionId !== undefined) {
                        const modelVersion = Number(route.params.modelVersionId);
                        return this.checkVersion(modelId, modelVersion);
                    }
                    return of(true);
                } else {
                    this.router.navigate([this.defaultUrl]);
                    this.mdlSnackbarService.showSnackbar({
                        message: `Models with id = ${modelId} doesn't exist`,
                        timeout: 5000,
                    });
                    return of(false);
                }
            })
        );
    }

    private modelsAreLoaded(): Observable<boolean> {
        return this.store.select(fromModels.getModelEntitiesLoaded).pipe(
            filter(loaded => loaded),
            take(1)
        );
    }

    private modelVersionAreLoaded(): Observable<boolean> {
        return this.store.select(fromModels.getModelVersionLoaded).pipe(
            filter(loaded => loaded),
            take(1)
        );
    }

    private checkVersion(modelId: number, modelVersionId: number): Observable<boolean> {
        return this.store.select(fromModels.getModelVersionsByModelId(modelId)).pipe(
            switchMap(modelVersions => {
                const modelVersion = modelVersions.find(modelVer => modelVer.id === modelVersionId);
                if (modelVersion) {
                    return of(true);
                } else {
                    this.router.navigate([this.defaultUrl, modelId]);
                    this.mdlSnackbarService.showSnackbar({
                        message: `Models version: ${modelVersionId} doesn't exist for model with id:${modelId}`,
                        timeout: 5000,
                    });
                    return of(false);
                }
            })
        );
    }
}
