import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';

import { Store } from '@ngrx/store';
import { AppState, Service, ModelService } from '@shared/models/_index';
import { ModelServicesService } from '@shared/services/_index';




@Component({
    selector: 'hydro-services-item-detail',
    templateUrl: './services-item-detail.component.html',
    styleUrls: ['./services-item-detail.component.scss']
})

export class ServicesItemDetailComponent implements OnInit {
    public id: string;
    public serviceModels: ModelService[];
    public services: Service[];
    public service: Service;

    constructor(
        public store: Store<AppState>,
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private modelServicesService: ModelServicesService
    ) {
        this.store.select('services')
            .subscribe(services => {
                this.services = services;
            });
    }

    ngOnInit() {
        this.activatedRoute.params
            .subscribe(params => {
                this.id = params['id'];
                if (this.services.length) {
                    this.getServiceData(this.id);
                }
            });

    }

    getServiceData(id: string) {
        this.serviceModels = [];
        let service = this.services
            .filter(service => service.id === +id)

        this.service = service.shift();
        if (this.service) {
            this.service.weights.forEach(weight => {
                this.getModelServiceData(weight.serviceId);
            })
        }
        
    }

    getModelServiceData(id: number) {
        this.modelServicesService.getModelService(id)
            .subscribe(data => {
                this.serviceModels.push(data);
            });
    }

    editService(id) {
        console.log(id);
    }

  
}
