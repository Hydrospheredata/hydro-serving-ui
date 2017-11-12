import { Component, InjectionToken, Inject } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { DialogBase } from '@shared/base/_index';
import { ServicesService } from '@shared/services/_index';
import * as Actions from '@shared/actions/_index';
import { AppState } from '@shared/models/_index';

export let injectableServiceOptions = new InjectionToken<object>('injectableServiceOptions');



@Component({
    selector: 'hydro-dialog-delete-service',
    templateUrl: './dialog-delete-service.component.html',
    styleUrls: ['./dialog-delete-service.component.scss']
})
export class DialogDeleteServiceComponent extends DialogBase {
    private data;
    public applicationId;
    public id: string;

    constructor(
        @Inject(injectableServiceOptions) data,
        private store: Store<AppState>,
        public dialogRef: MdlDialogReference,
        private mdlSnackbarService: MdlSnackbarService,
        private servicesService: ServicesService,
        private router: Router
    ) {
        super(
            dialogRef
        );
        this.applicationId = data;
    }

    submitDeleteServiceForm() {
        
        this.router.navigate(['applications']);
        this.store.dispatch({ type: Actions.DELETE_SERVICE, applicationId: this.applicationId });
        this.dialogRef.hide();
        this.mdlSnackbarService.showSnackbar({
            message: 'Service has been deleted',
            timeout: 5000
        });
    }

}
