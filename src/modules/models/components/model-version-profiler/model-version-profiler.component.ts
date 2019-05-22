import { Component, OnDestroy } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'hs-profiler',
    templateUrl: './model-version-profiler.component.html',
})
export class ModelVersionProfilerComponent implements OnDestroy {
    public modelVersionId: number;
    errors = true;
    private selectedModelVersionSub: Subscription;

    constructor(
        private store: Store<HydroServingState>
    ) {
        this.selectedModelVersionSub = this.store.select(getSelectedModelVersion).pipe(
            tap(modelVersion => {
                if (modelVersion) {
                    this.modelVersionId = modelVersion.id;
                } else {
                    this.modelVersionId = undefined;
                }
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.selectedModelVersionSub.unsubscribe();
    }
}
