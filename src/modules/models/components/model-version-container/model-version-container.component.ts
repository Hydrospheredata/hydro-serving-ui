import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './model-version-container.component.html',
    styleUrls: ['./model-version-container.component.scss'],
})
export class ModelVersionContainerComponent {
    public modelVersion$: Observable<IModelVersion>;

    constructor(
        private store: Store<HydroServingState>,
        private location: Location
    ) {
        this.modelVersion$ = this.store.select(getSelectedModelVersion);
    }

    back() {
        this.location.back();
    }
}
