import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { HydroServingState } from '@core/reducers';
import { Model, ModelVersion, IModel } from '@shared/models/_index';

import * as fromModels from '@models/reducers';
import { Observable, Subscription } from 'rxjs';

import { DialogService } from '@dialog/dialog.service';
import { DialogDeleteModelComponent } from '@models/components/dialogs';
import { switchMap, tap, filter } from 'rxjs/operators';
@Component({
    selector: 'hs-model-details',
    templateUrl: './model-details.component.html',
    styleUrls: ['./model-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelDetailsComponent implements OnDestroy {
    public model$: Observable<Model>;
    public modelVersions: ModelVersion[] = [];
    public modelVersionsSub: Subscription;

    public modelSub: Subscription;
    public model: IModel;

    constructor(
        private store: Store<HydroServingState>,
        private dialog: DialogService
    ) {
        this.modelSub = this.store.select(fromModels.getSelectedModel).pipe(
            filter(model => !!model),
            switchMap(model => {
                this.model = model;
                return this.store.select(fromModels.getModelVersionsByModelId(model.id));
            }),
            tap(modelVersions => { this.modelVersions = modelVersions; })
        ).subscribe();
    }

    public removeModel() {
        this.dialog.createDialog({
            component: DialogDeleteModelComponent,
        });
    }

    ngOnDestroy(): void {
        this.modelSub.unsubscribe();
    }
}
