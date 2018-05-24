import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
// import { Subscription } from 'rxjs/Subscription';

import { Model, ModelBuild } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';

// import { GetModelBuildsAction } from '@models/actions';
import * as fromModels from '@models/reducers';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'hydro-model-details',
    templateUrl: './model-details.component.html',
    styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit, OnDestroy {
    public model$: Observable<Model>;
    public modelBuilds$: Observable<ModelBuild[]>;
    public tableHeader: string[] = ['Version', 'Created', 'Status', 'Applications', ''];
    // private activatedRouteSubscription: Subscription;


    constructor(
        // private activatedRoute: ActivatedRoute,
        private store: Store<HydroServingState>,
    ) {
        this.model$ = this.store.select(fromModels.getSelectedModel);
        this.modelBuilds$ = this.store.select(fromModels.getAllModelBuilds);
    }

    public ngOnInit() {
        // this.activatedRouteSubscription = this.activatedRoute.params
        //     .map(params => {
        //         return params['modelId'];
        //     })
        //     .subscribe(modelId => {
        //         this.loadInitialData(Number(modelId));
        //     });
    }

    public ngOnDestroy() {
        // if (this.activatedRouteSubscription) {
        //     this.activatedRouteSubscription.unsubscribe();
        // }
    }

    // private loadInitialData(modelId: number) {
    //     this.store.dispatch(new GetModelBuildsAction(modelId));
    // }

}
