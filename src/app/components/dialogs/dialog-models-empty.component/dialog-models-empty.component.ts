import { Component } from '@angular/core';

import { MdlDialogReference } from '@angular-mdl/core';
import { DialogBase } from '@shared/base/_index';

@Component({
    selector: 'hydro-dialog-models-empty',
    templateUrl: './dialog-models-empty.component.html',
    styleUrls: ['./dialog-models-empty.component.scss'],
})

export class DialogModelsEmptyComponent extends DialogBase {

    constructor(
        public dialogRef: MdlDialogReference
    ) {
        super(dialogRef);
    }

    onClose(): void {
        this.dialogRef.hide();
    }
}
