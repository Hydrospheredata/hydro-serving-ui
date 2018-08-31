import { Component } from '@angular/core';
import {
    Application
} from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';
import * as HydroActions from '@applications/actions/applications.actions';
import { MdlDialogReference } from '@angular-mdl/core';

@Component({
    selector: 'hydro-dialog-add-service',
    templateUrl: './dialog-add-service.component.html'
})
export class DialogAddServiceComponent {
        constructor(
            private store: Store<HydroServingState>,
            public dialogRef: MdlDialogReference
        ){
    }

    onSubmit(fromData){
        const application = new Application(fromData);

        this.store.dispatch(new HydroActions.AddApplicationAction(application));
        this.dialogRef.hide()
    }
}

