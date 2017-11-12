import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState, Service, ModelService } from '@shared/models/_index';
import { ModelServicesService } from '@shared/services/_index';
import { ServiceBuilder } from '@shared/builders/_index';

import { environment } from '../../../environments/environment';

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
    public JSON = JSON;
    public title: string = '';
    public isService: boolean = true;
    public storeSub: Subscription;
    public combineSub: Subscription;
    public activeRouteSub: Subscription;
    public id: string = '';
    public serviceModels: any[] = [];
    public serviceModelsFiltered: any[];
    public services: Service[] = [];
    public service: Service;
    public path: string = '';

    public fullHeight: boolean = false;

    public tableHeader: string[] = ['Model', 'Version', 'Created Date', 'Weight'];

    public codeMirrorOptions: {} = {
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: { name: 'javascript', json: true },
        lineWrapping: true,
        readOnly: true,
        scrollbarStyle: 'null'
    };

    constructor(
        public store: Store<AppState>,
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private modelServicesService: ModelServicesService,
        private router: Router,
        private serviceBuilder: ServiceBuilder
    ) {

        this.activeRouteSub = this.activatedRoute.params
            .map(params => {
                this.id = params['id'];
                return this.id;
            })
            .subscribe(id => {
                this.path = `${environment.host}:${environment.port}${environment.uiUrl}${this.router.url}`;
                if (this.storeSub) {
                    this.storeSub.unsubscribe();
                }
                this.loadInitialData(id);
            });
    }

    loadInitialData(id) {
        this.storeSub = this.store.select('services')
            .filter(services => services.length > 0)
            .subscribe(services => {
                if (services.length) {
                    this.services = services;
                    this.getServiceData(id);
                }
            });
    }

    ngOnDestroy() {
        this.activeRouteSub.unsubscribe();
        this.storeSub.unsubscribe();
    }

    getServiceData(id: string) {
        this.serviceModels = [];
        if (this.services.length) {
            
            this.service = this.services.filter(service => service.id === Number(id)).shift();
            
            if (this.service && this.service.stages.length === 1) { // Checking for app
                this.title = this.service.serviceName;
                this.isService = true;
                this.service.stages[0].forEach(weight => {
                    this.getModelServiceData(weight);
                });
            } else {
                this.title = `Pipeline: ${this.service.serviceName}`;
                this.isService = false;
            }
        }
    }

    getModelServiceData(weight) {
        // TODO: Add effect to prevent get if exist in store, something like CACHE
        // this.store.dispatch({ type: Actions.GET_MODEL_SERVICE, payload: null });
        this.modelServicesService.getModelService(weight.service ? weight.service.serviceId : weight.serviceId)
            .subscribe(data => {
                this.serviceModels.push({ data: data, weight: weight.weight });
                if (this.serviceModels.length) {
                    this.serviceModelsFiltered = this.serviceModels.filter((item, index, self) => {
                        return self.findIndex(t => { return t.data.serviceId === item.data.serviceId}) === index;
                    });
                }
            });
    }

    testApp(service: Service) {
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
