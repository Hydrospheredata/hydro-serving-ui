import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdlDialogService } from '@angular-mdl/core';
import { Application } from '@shared/models/_index';

// import { Application } from '@shared/models/_index';
// import { HydroServingState } from '@core/reducers';
import * as fromApplications from '@applications/reducers';
import * as fromModels from '@models/reducers';
import { DialogAddApplicationComponent, DialogModelsEmptyComponent } from '@components/dialogs/_index';
import { Subscription } from 'rxjs';

@Component({
    selector: 'hydro-applications-wrapper',
    templateUrl: './applications-wrapper.component.html',
    styleUrls: ['./applications-wrapper.component.scss']
})

export class ApplicationsWrapperComponent implements OnDestroy{
    public sidebarTitle = 'Applications';
    public applications: Store<Application[]>;
    private modelStoreSub: Subscription;
    private finishedModelBuildsCount: number;

    constructor(
        private storeApp: Store<fromApplications.State>,
        private storeModels: Store<fromModels.State>,
        private dialog: MdlDialogService
    ) {
        this.applications = this.storeApp.select(fromApplications.getAllApplications);
        this.modelStoreSub = this.storeModels
                .select(fromModels.getAllModelBuilds)
                .map(modelBuilds => modelBuilds.filter(modelBuild => modelBuild.status.toLowerCase() === 'finished'))
                .subscribe(
                    modelBuilds => this.finishedModelBuildsCount = modelBuilds.length
                );
    }

    public addApplication(): void {
        this.finishedModelBuildsCount ? this.showAddServiceDialog() : this.showAlert();
    }

    ngOnDestroy(){
        this.modelStoreSub.unsubscribe();
    }

    private showAlert(): void{
        this.dialog.showCustomDialog({
            component: DialogModelsEmptyComponent,
            styles: { 'width': '100%', 'min-height': '200px', 'overflow': 'auto', 'max-width': '600px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        })
    }

    private showAddServiceDialog(): void{
        this.dialog.showCustomDialog({
            component: DialogAddApplicationComponent,
            styles: { 'width': '100%', 'height':'100%', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto', 'max-width': '840px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
    }
}
