import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import {
    ApplicationState,
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

    private modelId: number;
    private activatedRouteSub: Subscription;
    private modelsBuildsSub: Subscription;
    private modelsStoreSelectionSub: Subscription;
    private contractsStoreSub: Subscription;


    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<ApplicationState>
    ) { }

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
        if (this.contractsStoreSub) {
            this.contractsStoreSub.unsubscribe();
        }
    }

    private loadInitialData(modelVersionId: number) {
        this.store.dispatch(new Actions.GetModelBuildsAction(this.modelId));

        this.modelsBuildsSub = this.store.select('modelBuilds')
            .subscribe(builds => {
                this.build = builds.find(dataStoreItem => {
                    return dataStoreItem.version === modelVersionId && dataStoreItem.model.id === this.modelId;
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

}
