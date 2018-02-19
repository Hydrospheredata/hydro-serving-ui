import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, Application } from '@shared/models/_index';
// import * as Actions from '@shared/actions/_index';



@Component({
    selector: 'hydro-applications-wrapper',
    templateUrl: './applications-wrapper.component.html',
    styleUrls: ['./applications-wrapper.component.scss']
})

export class ApplicationsWrapperComponent {
    public sidebarTitle = 'Applications';
    public applications: Store<Application[]>;

    constructor(
        private store: Store<AppState>
    ) {
        this.applications = this.store.select('applications');
    }


}
