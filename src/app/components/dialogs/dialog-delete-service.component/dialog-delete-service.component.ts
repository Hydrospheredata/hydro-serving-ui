import { Component, InjectionToken, Inject } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { Store } from '@ngrx/store';

import { DialogBase } from '@shared/base/_index';
import { DeleteApplicationAction } from '@applications/actions/applications.actions';
import { HydroServingState } from '@core/reducers';

export let injectableApplicationId = new InjectionToken<number>('injectableApplicationId');



@Component({
    selector: 'hydro-dialog-delete-service',
    templateUrl: './dialog-delete-service.component.html',
    styleUrls: ['./dialog-delete-service.component.scss']
})
export class DialogDeleteServiceComponent extends DialogBase {
    private applicationId;

    constructor(
        @Inject(injectableApplicationId) data,
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );
        this.applicationId = data;
    }

    public submitDeleteServiceForm() {
        this.store.dispatch(new DeleteApplicationAction(this.applicationId));
        this.dialogRef.hide();
    }

}
