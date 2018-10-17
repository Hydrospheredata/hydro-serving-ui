import { Component } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { Store } from '@ngrx/store';

import { DialogBase } from '@shared/base/_index';
import { DeleteApplicationAction } from '@applications/actions/applications.actions';
import { HydroServingState } from '@core/reducers';

// export let injectableApplicationId = new InjectionToken<number>('injectableApplicationId');

import * as fromApplication from '@applications/reducers';



@Component({
    selector: 'hydro-dialog-delete-application',
    templateUrl: './dialog-delete-application.component.html',
    styleUrls: ['./dialog-delete-application.component.scss']
})
export class DialogDeleteApplicationComponent extends DialogBase {
    private applicationId: number;

    constructor(
        // @Inject(injectableApplicationId) data,
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );
        // this.applicationId = data;
        this.store.select(fromApplication.getSelectedApplicationId)
            .subscribe(id => this.applicationId = id);
    }

    public onDelete() {
        this.store.dispatch(new DeleteApplicationAction(this.applicationId));
        this.dialogRef.hide();
    }

}
