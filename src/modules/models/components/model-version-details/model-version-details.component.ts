
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers';
import { ModelVersion } from '@shared/models/_index';

@Component({
    selector: 'hydro-model-version-details',
    templateUrl: './model-version-details.component.html',
    styleUrls: ['./model-version-details.component.scss'],
})
export class ModelVersionDetailsComponent  {
    public modelVersion$: Observable<ModelVersion>;

    constructor(
        private store: Store<HydroServingState>
    ) {
        this.modelVersion$ = this.store.select(fromModels.getSelectedModelVersion);
    }
}
