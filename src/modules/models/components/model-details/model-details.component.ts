import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { HydroServingState } from '@core/reducers';
import { Model, ModelBuild } from '@shared/models/_index';

import { MdlDialogService } from '@angular-mdl/core';
import * as fromModels from '@models/reducers';
import { Observable } from 'rxjs';

import { DialogDeleteModelComponent } from '@components/dialogs/_index';

@Component({
    selector: 'hydro-model-details',
    templateUrl: './model-details.component.html',
    styleUrls: ['./model-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelDetailsComponent {
    public model$: Observable<Model>;
    public modelBuilds$: Observable<ModelBuild[]>;
    public tableHeader: string[] = ['Version', 'Created', 'Status', 'Applications', ''];

    constructor(
        private store: Store<HydroServingState>,
        private dialog: MdlDialogService
    ) {
        this.model$ = this.store.select(fromModels.getSelectedModel);
        this.modelBuilds$ = this.store.select(fromModels.getAllModelBuildsReversed);
    }

    public removeModel() {
        this.dialog.showCustomDialog({
            component: DialogDeleteModelComponent,
            styles: { 'min-height': '120px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
    }

}
