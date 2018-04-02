import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import {
    AppState,
    Signature
} from '@shared/models/_index';

import * as Actions from '@shared/actions/_index';


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

    private modelId: string;
    private activatedRouteSub: Subscription;
    private modelsBuildsSub: Subscription;
    private modelsStoreSelectionSub: Subscription;
    private contractsStoreSub: Subscription;


    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.activatedRouteSub = this.activatedRoute.params
            .map(params => {
                this.modelId = params['modelId'];
                const modelVersionId = params['modelVersionId'];
                return modelVersionId;
            })
            .subscribe(modelVersionId => {
                if (this.modelsStoreSelectionSub) {
                    this.modelsStoreSelectionSub.unsubscribe();
                }
                this.loadInitialData(modelVersionId);
            });
    }

    private loadInitialData(modelVersionId: string) {
        this.store.dispatch({ type: Actions.GET_MODEL_BUILDS, payload: this.modelId });
        this.modelsBuildsSub = this.store.select('modelBuilds')
            .subscribe(builds => {
                this.build = builds.find(dataStoreItem => {
                    return dataStoreItem.version === Number(modelVersionId) && dataStoreItem.model.id === Number(this.modelId);
                });
                if (this.build) {
                    this.store.dispatch({ type: Actions.GET_MODEL_BUILD_CONTRACTS, payload: this.build.id });
                }
            });

        this.contractsStoreSub = this.store.select('contracts')
            .subscribe(contracts => {
                this.contracts = contracts;
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
        if (this.contractsStoreSub) {
            this.contractsStoreSub.unsubscribe();
        }
    }

}
