import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Application } from '@shared/models/_index';
import { HydroServingState } from '@core/reducers';
import * as fromApplications from '@applications/reducers/_index';



@Component({
    selector: 'hydro-applications-wrapper',
    templateUrl: './applications-wrapper.component.html',
    styleUrls: ['./applications-wrapper.component.scss']
})

export class ApplicationsWrapperComponent {
    public sidebarTitle = 'Applications';
    public applications: Store<Application[]>;

    constructor(
        private store: Store<HydroServingState>
    ) {
        this.applications = this.store.select(fromApplications.getAllApplications);
    }


}
