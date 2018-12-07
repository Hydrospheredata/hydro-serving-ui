import { Component } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';

@Component({
    selector: 'hydro-dialog-models-empty',
    templateUrl: './dialog-models-empty.component.html',
    styleUrls: ['./dialog-models-empty.component.scss'],
})

export class DialogModelsEmptyComponent {

    constructor(
        public dialog: DialogService
    ) {}

    onClose(): void {
        this.dialog.closeDialog();
    }
}
