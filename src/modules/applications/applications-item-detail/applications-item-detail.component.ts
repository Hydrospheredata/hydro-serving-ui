import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { 
    AppState, 
    Application,
    ModelServicesService
} from '@shared/_index';

import { environment } from '@environments/environment';

import {
    DialogTestComponent,
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    injectableServiceOptions,
    injectableModelBuildOptions,
    injectableServiceUpdate
} from '@components/dialogs/_index';




@Component({
    selector: 'hydro-applications-item-detail',
    templateUrl: './applications-item-detail.component.html',
    styleUrls: ['./applications-item-detail.component.scss']
})

export class ApplicationsItemDetailComponent {
    public JSON = JSON;
    public title: string = '';
    public storeSub: Subscription;
    public combineSub: Subscription;
    public activeRouteSub: Subscription;
    public id: string = '';
    public serviceModels: any[] = [];
    public serviceModelsFiltered: any[];
    public applications: Application[] = [];
    public application: Application;
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
        private router: Router
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
        this.storeSub = this.store.select('applications')
            .filter(applications => applications.length > 0)
            .subscribe(applications => {
                if (applications.length) {
                    this.applications = applications;
                    this.getApplicationData(id);
                }
            });
    }

    ngOnDestroy() {
        this.activeRouteSub.unsubscribe();
        this.storeSub.unsubscribe();
    }

    getApplicationData(id: string) {
        this.serviceModels = [];
        if (this.applications.length) {
            this.application = this.applications.filter(application => application.id === Number(id)).shift();
            if (this.isPipeline(this.application)) {
                this.title = `Pipeline: ${this.application.name}`;
            } else {
                this.title = this.application.name;
                this.application.stages[0].forEach(weight => {
                    this.getModelServiceData(weight);
                });
            }
        }
    }

    public isPipeline(application: Application): boolean {
        return application && application.stages.length !== 1;
    }

    getModelServiceData(weight) {
        // TODO: Add effect to prevent get if exist in store, something like CACHE
        // this.store.dispatch({ type: Actions.GET_MODEL_SERVICE, payload: null });
        this.modelServicesService.getModelService(weight.service ? weight.service.serviceId : weight.serviceId)
            .subscribe(data => {
                console.log(data);
                this.serviceModels.push({ data: data, weight: weight.weight });
                if (this.serviceModels.length) {
                    this.serviceModelsFiltered = this.serviceModels.filter((item, index, self) => {
                        return self.findIndex(t => { return t.data.serviceId === item.data.serviceId;}) === index;
                    });
                }
            });
    }

    testApp(application: Application) {
        this.dialog.showCustomDialog({
            component: DialogTestComponent,
            styles: { 'width': '800px', 'min-height': '350px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableModelBuildOptions, useValue: application }],
        });
    }

    editApplication(application: Application) {
        this.dialog.showCustomDialog({
            component: DialogUpdateServiceComponent,
            styles: {'width': '900px', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableServiceUpdate, useValue: application}]
        });
    }

    removeApplication(id: number) {
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
