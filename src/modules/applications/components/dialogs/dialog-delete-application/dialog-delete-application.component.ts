import { Component } from '@angular/core';
import { DeleteApplicationAction } from '@applications/actions/applications.actions';
import * as fromApplication from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { DialogService } from '@dialog/dialog.service';
import { IApplication } from '@shared/_index';

@Component({
    templateUrl: './dialog-delete-application.component.html',
})
export class DialogDeleteApplicationComponent {
    private application: IApplication;

    constructor(
        public dialog: DialogService,
        private store: Store<HydroServingState>
    ) {
        this.store.select(fromApplication.getSelectedApplication)
            .subscribe(app => this.application = app);
    }

    public onDelete() {
        this.store.dispatch(new DeleteApplicationAction(this.application));
        this.dialog.closeDialog();
    }
}
