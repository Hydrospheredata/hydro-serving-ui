import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdlDialogService } from '@angular-mdl/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import {
    ApplicationState,
    Application,
    Runtime
} from '@shared/_index';

import { environment } from '@environments/environment';

import {
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    injectableApplicationId,
    injectableServiceUpdate
} from '@components/dialogs/_index';




@Component({
    selector: 'hydro-sources-item-detail',
    templateUrl: './sources-item-detail.component.html',
    styleUrls: ['./sources-item-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SourcesItemDetailComponent implements OnDestroy {
    public JSON = JSON;
    public title: string;
    public id: string;
    public serviceModels: any[] = [];
    public serviceModelsFiltered: any[];
    public applications: Application[] = [];
    public application: Application;
    public publicPath: string;

    public runtimes: Runtime[];

    public fullHeight: boolean;

    public tableHeader: string[] = ['Model', 'Version', 'Created Date', 'Weight'];

    public codeMirrorOptions: {} = {
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: { name: 'javascript', json: true },
        lineWrapping: true,
        readOnly: true,
        scrollbarStyle: 'null'
    };


    private storeSub: Subscription;
    private activeRouteSub: Subscription;
    private runtimesStoreSub: Subscription;

    constructor(
        public store: Store<ApplicationState>,
        public dialog: MdlDialogService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {

        this.activeRouteSub = this.activatedRoute.params
            .map(params => {
                this.id = params['id'];
                return this.id;
            })
            .subscribe(id => {
                this.publicPath = `${environment.host}:${environment.port}${environment.apiUrl}${this.router.url}`;
                if (this.storeSub) {
                    this.storeSub.unsubscribe();
                }
                this.loadInitialData(id);
            });
    }

    loadInitialData(id) {
        this.runtimesStoreSub = this.store.select('runtimes')
            .subscribe(runtimes => this.runtimes = runtimes);

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
        this.runtimesStoreSub.unsubscribe();
    }

    getApplicationData(id: string) {
        console.log(id);
        this.serviceModels = [];
        if (this.applications.length) {
            this.application = this.applications.filter(application => application.id === Number(id)).shift();
        }
    }

    public getRuntimeInfo(runtimeId: number) {
        console.log(this.runtimes.find(runtimes => runtimes.id === runtimeId));
        const runtime = this.runtimes.find(runtimes => runtimes.id === runtimeId);
        return runtime.name;
    }

    public editApplication(application: Application) {
        this.dialog.showCustomDialog({
            component: DialogUpdateServiceComponent,
            styles: { 'width': '900px', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableServiceUpdate, useValue: application }]
        });
    }

    public removeApplication(id: number) {
        this.dialog.showCustomDialog({
            component: DialogDeleteServiceComponent,
            styles: { 'width': '600px', 'min-height': '250px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableApplicationId, useValue: id }]
        });
    }


}
