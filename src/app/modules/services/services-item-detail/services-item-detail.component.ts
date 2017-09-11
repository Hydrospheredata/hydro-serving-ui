import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';

import { 
    WeightedServiceStore,
    HttpModelServiceService 
} from '@shared/_index';

import { WeightedService } from '@models/weighted-service';
import {
  DialogWeightedServiceComponent,
  injectableWeightedService
} from '@components/dialogs/dialog-weighted-service/dialog-weighted-service.component';



@Component({
    selector: 'hydro-services-item-detail',
    templateUrl: './services-item-detail.component.html',
    styleUrls: ['./services-item-detail.component.scss']
})

export class ServicesItemDetailComponent implements OnInit {
    private activatedRouteSub: any;
    public id: string;
    title: string;
    models: any = [];

    weightedService: any;
    weightedServicesModels: any;

    constructor(
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private weightedServiceStore: WeightedServiceStore,
        private modelService: HttpModelServiceService
    ) {}

    ngOnInit() {
        this.activatedRouteSub = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.getServiceData(this.id);
        });

    }

    getServiceData(id: string) {
        this.weightedServicesModels = [];
        this.weightedServiceStore.items
            .map((services) => {
                return services.filter((service) => service.id === +id);
            })
            .subscribe((service) => {
                this.weightedService = service.shift();
                if (this.weightedService) {
                    this.weightedService.weights.forEach(item => {
                        this.getModelServiceData(item.serviceId);
                    })
                }
            });
    }

    getModelServiceData(id: number) {
        this.modelService.getModelService(id)
            .subscribe((data) => {
                console.log(data);
                this.weightedServicesModels.push(data);
            });
    }

    editService(id) {
        console.log(id);
    }

  
}
