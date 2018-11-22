import {
    Component,
    ViewChild
} from '@angular/core';

import { MdlDialogReference } from '@angular-mdl/core';
import { ApplicationFormComponent } from '@applications/components/forms/application-form/application-form.component';
import {
    DialogBase,
    Application
} from '@shared/_index';

import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import * as HydroActions from '@applications/actions/applications.actions';

@Component({
    selector: 'hydro-dialog-add-application',
    templateUrl: './dialog-add-application.component.html',
    styleUrls: ['./dialog-add-application.component.scss'],
})
export class DialogAddApplicationComponent extends DialogBase {
    @ViewChild('applicationForm') ApplicationFormComponent: ApplicationFormComponent;

    constructor(
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>
    ) {
        super(dialogRef);
    }

    close(): void {
        this.dialogRef.hide();
    }

    public onSubmit(data): void {
        this.store.dispatch(new HydroActions.AddApplicationAction(new Application(data)));
        this.close();
    }
}
