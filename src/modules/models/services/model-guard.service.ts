import { Injectable } from "@angular/core";
import { CanActivateChild, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { GetModelBuildsAction } from "@models/actions";
import * as fromModels from '@models/reducers';
import { switchMap, filter, take } from 'rxjs/operators';
import { MdlSnackbarService } from '@angular-mdl/core';
import { forkJoin } from "rxjs/observable/forkJoin";

@Injectable()
export class ModelDetailsGuard implements CanActivateChild {
    private defaultUrl: string = 'models';

    constructor(
        private store: Store<fromModels.ModelsState>,
        private mdlSnackbarService: MdlSnackbarService,
        private router: Router
    ) { }

    private modelIsLoaded(): Observable<boolean>{
        return this.store.select(fromModels.getModelEntitiesLoaded).pipe(filter(_ => _), take(1));
    }

    private modelBuildIsLoaded(): Observable<boolean>{
        return this.store.select(fromModels.getModelBuildEntitiesLoaded).pipe(filter(_ => _), take(1));
    }

    canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
        const modelId = Number(route.params.modelId);

        this.store.dispatch(new GetModelBuildsAction(modelId));

        return forkJoin(
            this.modelIsLoaded(), 
            this.modelBuildIsLoaded()).pipe(
                switchMap(_ => this.store.select(fromModels.getAllModels)),
                switchMap((models) => {
                    if(models.some(model => model.id === modelId)) {
                        if(route.params.modelVersionId !== undefined){
                            const modelVersion = Number(route.params.modelVersionId);
                            return this.checkVersion(modelId, modelVersion);
                        }
                        return Observable.of(true);
                    } else {
                        this.router.navigate([this.defaultUrl]);
                        this.mdlSnackbarService.showSnackbar({
                            message: `Models with id = ${modelId} doesn't exist`,
                            timeout: 3000
                        });
                        return Observable.of(false);
                    }
                })
            )
    }

    checkVersion(modelId: number, modelVersion: number): Observable<boolean>{
        return this.store.select(fromModels.getAllModelBuilds).pipe(
                switchMap(modelBuilds => {
                    if(modelBuilds.find(modelBuild => modelBuild.version === modelVersion)){
                        return Observable.of(true);
                    } else {
                        this.router.navigate([this.defaultUrl, modelId]);
                        this.mdlSnackbarService.showSnackbar({
                            message: `Models version = ${modelVersion} for model with id = ${modelId} doesn't exist`,
                            timeout: 3000
                        });
                        return Observable.of(false);
                    }
                })
            )
    }
}