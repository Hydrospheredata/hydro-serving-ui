import { Component } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { Store } from '@ngrx/store';

import { DialogBase } from '@shared/base/_index';
import { HydroServingState } from '@core/reducers';

import * as fromModel from '@models/reducers';
import { DeleteModelAction } from '@models/actions';



@Component({
    selector: 'hydro-dialog-delete-model',
    templateUrl: './dialog-delete-model.component.html',
    styleUrls: ['./dialog-delete-model.component.scss']
})
export class DialogDeleteModelComponent extends DialogBase {
    private modelId: number;

    constructor(
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );
        this.store.select(fromModel.getSelectedModelId)
            .subscribe(id => this.modelId = id);
    }

    public submitDeleteModelForm() {
        this.store.dispatch(new DeleteModelAction(this.modelId));
        this.dialogRef.hide();
    }

}
