import { Component } from '@angular/core';

import { HydroServingState } from '@core/reducers';
import { DeleteModelAction } from '@models/actions';
import * as fromModel from '@models/reducers';
import { Store } from '@ngrx/store';

import { DialogService } from '@dialog/dialog.service';
@Component({
    selector: 'hydro-dialog-delete-model',
    templateUrl: './dialog-delete-model.component.html',
})
export class DialogDeleteModelComponent {
    private modelId: number;

    constructor(
        public dialog: DialogService,
        private store: Store<HydroServingState>
    ) {
        this.store.select(fromModel.getSelectedModelId)
            .subscribe(id => this.modelId = id);
    }

    public onClose(): void {
        this.dialog.closeDialog();
    }

    public onDelete(): void {
        this.store.dispatch(new DeleteModelAction(this.modelId));
        this.onClose();
    }
}
