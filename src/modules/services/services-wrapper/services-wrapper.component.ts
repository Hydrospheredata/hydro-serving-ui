import { Component, OnDestroy } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState, Service } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { ServicesService, ModelServicesService } from '@shared/services/_index';
import { ServiceBuilder } from '@shared/builders/_index';

import { 
    DialogAddServiceComponent, 
    DialogDeleteServiceComponent,
    injectableServiceOptions 
} from '@components/dialogs/_index';



@Component({
  selector: 'hydro-services-wrapper',
  templateUrl: './services-wrapper.component.html',
  styleUrls: ['./services-wrapper.component.scss']
})

export class ServicesWrapperComponent implements OnDestroy {

    private servicesServiceSubscription: Subscription;
    private modelServicesServiceSubscription: Subscription;
    private data: Service[];
    private sidebarTitle: string = 'Services';
    private services: any;

    constructor(
        private store: Store<AppState>,
        private servicesService: ServicesService,
        private modelServicesService: ModelServicesService,
        private serviceBuilder: ServiceBuilder,
        private dialog: MdlDialogService,
    ) {
        this.servicesServiceSubscription = this.servicesService.getServices()
            .subscribe(services => {
                this.data = services.map(service => this.serviceBuilder.build(service));
                this.store.dispatch({ type: Actions.GET_SERVICES, payload: this.data });
            });
        this.modelServicesServiceSubscription = this.modelServicesService.getModelServices()
            .map(serviceModels => serviceModels.filter(model => model.serviceId > 0))
            .subscribe(serviceModels => {
                this.store.dispatch({ type: Actions.GET_MODEL_SERVICE, payload: serviceModels });
            });
        this.services = this.store.select('services');
    }

    addService(value) {
        console.log(value);
        // this.dialog.showCustomDialog({
        //     component: DialogAddServiceComponent,
        //     styles: {'width': '850px', 'min-height': '250px'},
        //     classes: '',
        //     isModal: true,
        //     clickOutsideToClose: true,
        //     enterTransitionDuration: 400,
        //     leaveTransitionDuration: 400,
        //     providers: [{provide: injectableService}]
        // });
    }

    ngOnDestroy() {
        this.servicesServiceSubscription.unsubscribe();
        this.modelServicesServiceSubscription.unsubscribe();
    }


}
