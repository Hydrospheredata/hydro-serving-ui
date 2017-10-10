import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { AppState, Service, ModelService } from '@shared/models/_index';
import { ModelServicesService } from '@shared/services/_index';

import {
    DialogTestComponent,
    DialogUpdateServiceComponent,
    injectableModelBuildOptions,
    injectableServiceUpdate
} from '@components/dialogs/_index';




@Component({
    selector: 'hydro-services-item-detail',
    templateUrl: './services-item-detail.component.html',
    styleUrls: ['./services-item-detail.component.scss']
})

export class ServicesItemDetailComponent {
    public id: string;
    public serviceModels: any[];
    public services: Service[] = [];
    public service: Service;

    public tableHeader: string[] = [
        'Model', 'Version', 'Created Date', 'Weight'
    ];

    public tableData: any;

    constructor(
        public store: Store<AppState>,
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private modelServicesService: ModelServicesService,
        private router: Router
    ) {
        this.store.select('services')
            .subscribe(services => {
                if (services.length) {
                    this.services = services;
                    if (this.id) {
                        this.getServiceData(this.id);
                    }
                }
            });

        this.activatedRoute.params
            .subscribe(params => {
                this.id = params['id'];
                this.getServiceData(this.id);
            });
    }

    getServiceData(id: string) {
        this.serviceModels = [];

        if (this.services.length) {
            const service = this.services
                .filter(service => service.id === +id);

            this.service = service.shift();
            if (this.service) {
                this.service.weights.forEach(weight => {
                    this.getModelServiceData(weight);
                });
            }
        }
    }

    getModelServiceData(weight) {
        this.modelServicesService.getModelService(weight.service ? weight.service.serviceId : weight.serviceId)
            .subscribe(data => {
                this.serviceModels.push({ data: data, weight: weight.weight });
                this.tableData = this.serviceModels;
            });
    }


}
