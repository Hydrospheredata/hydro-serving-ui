import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, Service } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';



@Component({
  selector: 'hydro-services-wrapper',
  templateUrl: './services-wrapper.component.html',
  styleUrls: ['./services-wrapper.component.scss']
})

export class ServicesWrapperComponent {

    private data: Service[];
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
