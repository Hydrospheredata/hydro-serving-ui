import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { HydroServingState } from '@core/reducers';
import { Model, ModelBuild } from '@shared/models/_index';

import * as fromModels from '@models/reducers';
import { Observable } from 'rxjs';

import { DialogService } from '@dialog/dialog.service';
import { DialogDeleteModelComponent } from '@models/components/dialogs';

@Component({
    selector: 'hs-model-details',
    templateUrl: './model-details.component.html',
    styleUrls: ['./model-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelDetailsComponent {
    public model$: Observable<Model>;
    public modelBuilds$: Observable<ModelBuild[]>;
    public modelBuildsLoading$: Observable<boolean>;
    public tableHeader: string[] = ['Version', 'Created', 'Status', 'Applications', ''];

    constructor(
        private store: Store<HydroServingState>,
        private dialog: DialogService
    ) {
        this.model$ = this.store.select(fromModels.getSelectedModel);
        this.modelBuilds$ = this.store.select(fromModels.getAllModelBuildsReversed);
        this.modelBuildsLoading$ = this.store.select(fromModels.getModelBuildEntitiesLoading);
    }

    public removeModel() {
        this.dialog.createDialog({
            component: DialogDeleteModelComponent,
        });
    }
}
