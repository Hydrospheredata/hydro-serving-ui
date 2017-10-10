import { Component, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';
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
export class DialogDeleteServiceComponent {
    private data;
    public modelId;
    public id: string;

    constructor(
        @Inject(injectableServiceOptions) data,
        private store: Store<AppState>,
        public dialogRef: MdlDialogReference,
        private mdlSnackbarService: MdlSnackbarService,
        private servicesService: ServicesService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {
        this.modelId = data;
    }

    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialogRef.hide();
    }

    submitDeleteServiceForm() {
        this.servicesService.deleteService(this.modelId)
            .subscribe(services => {
                console.log(services);
                this.store.dispatch({ type: Actions.DELETE_SERVICE, serviceId: this.modelId });
                this.router.navigate(['/services']);
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
