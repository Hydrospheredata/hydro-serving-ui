import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { AppState, Service, ModelService } from '@shared/models/_index';
import { ModelServicesService } from '@shared/services/_index';
import { ServiceBuilder } from '@shared/builders/_index';

import {
    DialogTestComponent,
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    injectableServiceOptions,
    injectableModelBuildOptions,
    injectableServiceUpdate
} from '@components/dialogs/_index';




@Component({
    selector: 'hydro-services-item-detail',
    templateUrl: './services-item-detail.component.html',
    styleUrls: ['./services-item-detail.component.scss']
})

export class ServicesItemDetailComponent {
    public storeSub: Subscription;
    public id: string;
    public serviceModels: any[];
    public services: Service[] = [];
    public service: Service;

    public tableHeader: string[] = [
        'Model', 'Version', 'Created Date', 'Weight'
    ];

    constructor(
        public store: Store<AppState>,
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private modelServicesService: ModelServicesService,
        private router: Router,
        private serviceBuilder: ServiceBuilder
    ) {
        this.storeSub = this.store.select('services')
            .filter(services => services.length > 0)
            .subscribe(services => {
                if (services.length) {
                    this.services = services.map(service => this.serviceBuilder.build(service));;
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

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

    getServiceData(id: string) {
        this.serviceModels = [];

        if (this.services.length) {
            const service = this.services
                .filter(service => service.id === +id);

            this.service = service.shift();
            if (this.service.kafkaStreamingSources.length) {
                this.service.kafkaStreamingSources.forEach(kafka => {
                    if (kafka.serviceId) {
                        delete kafka.serviceId;
                    }
                })
            }
            console.log(this.service);
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
            });
    }

    testService(service: Service) {
        console.log(service);
        this.dialog.showCustomDialog({
            component: DialogTestComponent,
            styles: { 'width': '800px', 'min-height': '350px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableModelBuildOptions, useValue: service }],
        });
    }

    editService(service: Service) {
        this.dialog.showCustomDialog({
            component: DialogUpdateServiceComponent,
            styles: {'width': '900px', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableServiceUpdate, useValue: service}]
        });
    }

    removeService(id: number) {
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
