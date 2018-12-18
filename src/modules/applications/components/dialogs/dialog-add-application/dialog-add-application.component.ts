import {
    Component,
    ViewChild
} from '@angular/core';

import { ApplicationFormComponent } from '@applications/components/forms/application-form/application-form.component';
import {
    Application
} from '@shared/_index';

import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import * as HydroActions from '@applications/actions/applications.actions';
import { DialogService } from '@dialog/dialog.service';

@Component({
    templateUrl: './dialog-add-application.component.html',
})
export class DialogAddApplicationComponent {
    @ViewChild('applicationForm') ApplicationFormComponent: ApplicationFormComponent;

    constructor(
        public dialog: DialogService,
        private store: Store<HydroServingState>
    ) {}

    public onClose(): void {
        this.dialog.closeDialog();
    }

    public onSubmit(data): void {
        this.store.dispatch(new HydroActions.AddApplicationAction(new Application(data)));
        this.onClose();
    }
}
