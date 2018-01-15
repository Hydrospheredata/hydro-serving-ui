import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, Service } from '@shared/_index';
import * as Actions from '@shared/actions/_index';



@Component({
    selector: 'hydro-applications-wrapper',
    templateUrl: './applications-wrapper.component.html',
    styleUrls: ['./applications-wrapper.component.scss']
})

export class ApplicationsWrapperComponent {
    public sidebarTitle = 'Applications';
    public services: Store<Service[]>;

    constructor(
        private store: Store<AppState>
    ) {
        
        this.store.dispatch({ type: Actions.GET_SERVICES, payload: null });
        this.store.dispatch({ type: Actions.GET_MODEL_SERVICES, payload: null });
        this.services = this.store.select('services');
    }


}
