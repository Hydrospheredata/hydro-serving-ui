
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription ,  Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { HydroServingState } from '@core/reducers';
import { Signature, ModelBuild } from '@shared/models/_index';

// import * as Actions from '@core/actions';
import { GetModelBuildsAction } from '@models/actions';
import * as fromModels from '@models/reducers';

@Component({
    selector: 'hydro-model-version-details',
    templateUrl: './model-version-details.component.html',
    styleUrls: ['./model-version-details.component.scss'],
})
export class ModelVersionDetailsComponent implements OnInit, OnDestroy {
    public tableHeader: string[] = [
        'Field name', 'Data type', 'Shape',
    ];

    public build$: Observable<ModelBuild>;

    public modelId: number;
    public modelVersionId: number;
    private activatedRouteSub: Subscription;
    private modelsBuildsSub: Subscription;
    private modelsStoreSelectionSub: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<HydroServingState>
    ) {
        this.build$ = this.store.select(fromModels.getSelectedBuild);
    }

    ngOnInit() {
        this.activatedRouteSub = this.activatedRoute.params.pipe(
            map(params => {
                this.modelId = Number(params.modelId);
                this.modelVersionId = Number(params.modelVersionId);
                return this.modelVersionId;
            }))
            .subscribe(modelVersionId => {
                if (this.modelsStoreSelectionSub) {
                    this.modelsStoreSelectionSub.unsubscribe();
                }
                this.loadInitialData(modelVersionId);
            });
    }

    ngOnDestroy() {
        if (this.activatedRouteSub) {
            this.activatedRouteSub.unsubscribe();
        }
        if (this.modelsStoreSelectionSub) {
            this.modelsStoreSelectionSub.unsubscribe();
        }
        if (this.modelsBuildsSub) {
            this.modelsBuildsSub.unsubscribe();
        }
    }

    private loadInitialData(modelVersionId: number) {
        console.log(modelVersionId);
        this.store.dispatch(new GetModelBuildsAction(this.modelId));
    }
}
