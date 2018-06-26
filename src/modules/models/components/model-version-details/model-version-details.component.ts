import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Signature, ModelBuild } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';

// import * as Actions from '@core/actions';
import { GetModelBuildsAction } from '@models/actions';
import * as fromModels from '@models/reducers';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'hydro-model-version-details',
    templateUrl: './model-version-details.component.html',
    styleUrls: ['./model-version-details.component.scss']
})
export class ModelVersionDetailsComponent implements OnInit, OnDestroy {
    public tableHeader: string[] = [
        'Field name', 'Data type', 'Shape'
    ];

    public contracts: Signature[];
    public build: any;
    public build$: Observable<ModelBuild>;

    private modelId: number;
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
        this.activatedRouteSub = this.activatedRoute.params
            .map(params => {
                this.modelId = Number(params['modelId']);
                const modelVersionId = Number(params['modelVersionId']);
                return modelVersionId;
            })
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
        // this.store.dispatch(new Actions.GetSignaturesAction({ type: 'model-version', id: this.modelId }));
    }

}
