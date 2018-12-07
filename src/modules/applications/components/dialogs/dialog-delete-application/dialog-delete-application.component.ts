import { Component } from '@angular/core';
import { DeleteApplicationAction } from '@applications/actions/applications.actions';
import * as fromApplication from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { DialogService } from '@dialog/dialog.service';

@Component({
    selector: '',
    templateUrl: './dialog-delete-application.component.html',
})
export class DialogDeleteApplicationComponent {
    private applicationId: number;

    constructor(
        public dialog: DialogService,
        private store: Store<HydroServingState>
    ) {
        this.store.select(fromApplication.getSelectedApplicationId)
            .subscribe(id => this.applicationId = id);
    }

    public onDelete() {
        this.store.dispatch(new DeleteApplicationAction(this.applicationId));
        this.dialog.closeDialog();
    }
}
