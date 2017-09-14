import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Model } from '@models/model';

import { ServicesService, Service, DELETE_SERVICE } from '@shared/_index';

import { AppState } from '@shared/models/_index';

import { WeightedService } from '@models/weighted-service';
import { MdlDialogService } from '@angular-mdl/core';

import { DialogWeightedServiceComponent, injectableWeightedService } from '@components/dialogs/dialog-weighted-service/dialog-weighted-service.component';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';

import {
  DialogDeleteServiceComponent,
  injectableServiceOptions
} from '@components/dialogs/dialog-delete-service/dialog-delete-service.component';

import {
    DialogAddServiceComponent
} from '@components/dialogs/dialog-add-service.component/dialog-add-service.component'



@Component({
    selector: 'hydro-services-sidebar',
    templateUrl: './services-sidebar.component.html',
    styleUrls: ['./services-sidebar.component.scss']
})



export class ServicesSidebarComponent implements OnInit {
    public searchQ: string;
    public services: Service[];

    constructor(
        private store: Store<AppState>,
        private dialog: MdlDialogService,
        private servicesService: ServicesService
    ) {  }

    ngOnInit() {
        this.store.select('services')
            .subscribe(services => {
                this.services = services;
            });
    }

    openDialogTestWeightedServicesForm(service?: WeightedService) {
        this.dialog.showCustomDialog({
            component: DialogTestComponent,
            styles: {'width': '850px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableModelBuildOptions, useValue: service}],
        });
    }

    addService(service: Service) {
        this.dialog.showCustomDialog({
            component: DialogWeightedServiceComponent,
            styles: {'width': '850px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableWeightedService, useValue: service}]
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
