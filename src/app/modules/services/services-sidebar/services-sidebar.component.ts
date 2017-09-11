import { Component, OnInit, Input } from '@angular/core';

import { Model } from '@models/model';

import { 
    ModelStore, 
    WeightedServiceStore,
    // DialogDeleteServiceComponent,
    // DialogTestComponent,
    // DialogWeightedServiceComponent,
    // injectableModelBuildOptions,  
    // injectableServiceOptions,
    // injectableWeightedService
} from '@shared/_index';

import { WeightedService } from '@models/weighted-service';
import { MdlDialogService } from '@angular-mdl/core';

import { DialogWeightedServiceComponent, injectableWeightedService } from '@components/dialogs/dialog-weighted-service/dialog-weighted-service.component';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';

import {
  DialogDeleteServiceComponent,
  injectableServiceOptions
} from '@components/dialogs/dialog-delete-service/dialog-delete-service.component';



@Component({
  selector: 'hydro-services-sidebar',
  templateUrl: './services-sidebar.component.html',
  styleUrls: ['./services-sidebar.component.scss']
})



export class ServicesSidebarComponent implements OnInit {
    public searchQ: string;
    public services: WeightedService[];
    public activeService;
    public modelServices;
    public models: Model[];

    constructor(
        private dialog: MdlDialogService,
        private weightedServiceStore: WeightedServiceStore,
        private modelStore: ModelStore
    ) {
        this.services = [];
        this.modelServices = [];
    }

    @Input() weightedServices: WeightedService[];

    ngOnInit() {
    }

    addService(service?: WeightedService) {
        this.dialog.showCustomDialog({
            component: DialogWeightedServiceComponent,
            styles: {'width': '850px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableWeightedService, useValue: service}],
        });
    }

    openDialogTestWeightedServicesForm(service?: WeightedService) {
        console.log(service);
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

    deleteService(id: string) {
        this.dialog.showCustomDialog({
            component: DialogDeleteServiceComponent,
            styles: {'width': '600px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableServiceOptions, useValue: id}],
        });
    }

}
