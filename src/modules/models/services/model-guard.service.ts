import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { GetModelBuildsAction } from '@models/actions';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';
import { Model } from '@shared/_index';
import { Observable ,  forkJoin ,  of } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class ModelDetailsGuard implements CanActivateChild {
    private defaultUrl: string = 'models';

    constructor(
        private store: Store<fromModels.ModelsState>,
        private mdlSnackbarService: MdlSnackbarService,
        private router: Router
    ) { }

    canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
        const modelId = Number(route.params.modelId);

        this.store.dispatch(new GetModelBuildsAction(modelId));

        return forkJoin(
            this.modelsAreLoaded(),
            this.modelBuildsAreLoaded()
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

    private modelBuildsAreLoaded(): Observable<boolean> {
        return this.store.select(fromModels.getModelBuildEntitiesLoaded).pipe(
            filter(loaded => loaded),
            take(1)
        );
    }

    private checkVersion(modelId: number, modelVersion: number): Observable<boolean> {
        return this.store.select(fromModels.getAllModelBuilds).pipe(
            switchMap(modelBuilds => {
                const modelBuild = modelBuilds.find(curModelBuild => curModelBuild.version === modelVersion);
                if (modelBuild) {
                    return of(true);
                } else {
                    this.router.navigate([this.defaultUrl, modelId]);
                    this.mdlSnackbarService.showSnackbar({
                        message: `Models version: ${modelVersion} doesn't exist for model with id:${modelId}`,
                        timeout: 5000,
                    });
                    return of(false);
                }
            })
        );
    }
}
