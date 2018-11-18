import { Component, OnDestroy } from '@angular/core';

import * as fromApplications from '@applications/reducers';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';

import { DialogAddApplicationComponent, DialogModelsEmptyComponent } from '@components/dialogs/_index';
import { Application, Model } from '@shared/models/_index';

import { MdlDialogService } from '@angular-mdl/core';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'hydro-applications-wrapper',
    templateUrl: './applications-wrapper.component.html',
    styleUrls: ['./applications-wrapper.component.scss'],
})

export class ApplicationsWrapperComponent implements OnDestroy {
    public sidebarTitle = 'Applications';
    public applications: Observable<Application[]>;
    private someModelIsFinished: boolean = false;
    private modelsSub: Subscription;

    constructor(
        private storeApp: Store<fromApplications.State>,
        private storeModels: Store<fromModels.State>,
        private dialog: MdlDialogService
    ) {
        this.applications = this.storeApp.select(fromApplications.getAllApplications);
        this.modelsSub = this.storeModels.select(fromModels.getAllModels).subscribe(
            models => {
                this.someModelIsFinished = models.some(this.lastModelVersionExist);
            }
        );
    }

    public addApplication(): void {
        this.someModelIsFinished ? this.showAddServiceDialog() : this.showAlert();
    }

    ngOnDestroy(): void {
        this.modelsSub.unsubscribe();
    }

    private lastModelVersionExist({ lastModelVersion }: Model): boolean {
        return !!lastModelVersion;
    }

    private showAlert(): void {
        this.dialog.showCustomDialog({
            component: DialogModelsEmptyComponent,
            styles: {
                'width': '100%',
                'min-height': '200px',
                'overflow': 'auto',
                'max-width': '600px',
            },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
    }

    private showAddServiceDialog(): void {
        this.dialog.showCustomDialog({
            component: DialogAddApplicationComponent,
            styles: {
                'width': '100%',
                'height': '100%',
                'min-height': '250px',
                'max-height': '90vh',
                'overflow': 'auto',
                'max-width': '840px',
            },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
        });
    }
}
