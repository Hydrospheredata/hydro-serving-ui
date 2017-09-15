import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ServicesService } from '@shared/services/_index';
import * as Actions from '@shared/actions/_index';
import { AppState } from '@shared/models/_index';

export let injectableServiceOptions = new InjectionToken<object>('injectableServiceOptions');



@Component({
    selector: 'hydro-dialog-delete-service',
    templateUrl: './dialog-delete-service.component.html',
    styleUrls: ['./dialog-delete-service.component.scss']
})
export class DialogDeleteServiceComponent implements OnInit {
    private data;
    public modelId;
    public id: string;

    constructor(
        @Inject(injectableServiceOptions) data,
        private store: Store<AppState>,
        public dialogRef: MdlDialogReference,
        private mdlSnackbarService: MdlSnackbarService,
        private servicesService: ServicesService,
        private router: Router
    ) {
        this.modelId = data;
    }

    ngOnInit() {
        console.log(this.router);
        console.log(this.router.routerState);
    }

    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialogRef.hide();
    }

    submitDeleteServiceForm() {
        this.servicesService.deleteService(this.modelId)
            .subscribe(services => {
                this.store.dispatch({ type: Actions.DELETE_SERVICE, serviceId: this.modelId });
                this.dialogRef.hide();
                this.mdlSnackbarService.showSnackbar({
                  message: 'Service has been deleted',
                  timeout: 5000
                });
            },
            (error) => {
              this.mdlSnackbarService.showSnackbar({
                message: error,
                timeout: 5000
              });
            });
    }

}
