import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

// import { Application } from '@shared/models/_index';
// import { HydroServingState } from '@core/reducers';
import * as fromApplications from '@applications/reducers';



@Component({
    selector: 'hydro-applications-wrapper',
    templateUrl: './applications-wrapper.component.html',
    styleUrls: ['./applications-wrapper.component.scss']
})

export class ApplicationsWrapperComponent {
    public sidebarTitle = 'Applications';
    public applications: any;

    constructor(
        private store: Store<fromApplications.State>
    ) {
        this.applications = this.store.select(fromApplications.getAllApplications);
    }


}
