import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';

import { ServicesService, Service } from '@shared/_index';
import { AppState } from '@shared/models/_index';

import { 
    DialogAddServiceComponent, 
    DialogDeleteServiceComponent, 
    injectableServiceOptions
} from '@components/dialogs/_index';



@Component({
    selector: 'hydro-services-sidebar',
    templateUrl: './services-sidebar.component.html',
    styleUrls: ['./services-sidebar.component.scss']
})



export class ServicesSidebarComponent {
    public searchQ: string;
    public services: Service[];

    constructor(
        private store: Store<AppState>,
        private dialog: MdlDialogService,
        private servicesService: ServicesService,
        private activatedRoute: ActivatedRoute
    ) {
        this.store.select('services')
            .subscribe(services => {
                this.services = services;
            });
    }

    addService(service?: Service) {
        this.dialog.showCustomDialog({
            component: DialogAddServiceComponent,
            styles: {'width': '850px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
            // providers: [{provide: injectableService, useValue: service}]
        });
    }

    deleteService(id: string) {
        this.dialog.showCustomDialog({
            component: DialogDeleteServiceComponent,
            styles: {'width': '600px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableServiceOptions, useValue: id}]
        });
    }

}
