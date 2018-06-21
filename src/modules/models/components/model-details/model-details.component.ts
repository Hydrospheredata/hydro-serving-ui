import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Model, ModelBuild } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';

import * as fromModels from '@models/reducers';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'hydro-model-details',
    templateUrl: './model-details.component.html',
    styleUrls: ['./model-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelDetailsComponent {
    public model$: Observable<Model>;
    public modelBuilds$: Observable<ModelBuild[]>;
    public tableHeader: string[] = ['Version', 'Created', 'Status', 'Applications', ''];

    constructor(
        private store: Store<HydroServingState>,
    ) {
        this.model$ = this.store.select(fromModels.getSelectedModel);
        this.modelBuilds$ = this.store.select(fromModels.getAllModelBuildsReversed);
    }

}
