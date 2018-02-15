import { Component, ViewContainerRef } from '@angular/core';
import { MdlDialogOutletService } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';



@Component({
    selector: 'hydro-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'HydroServingUi';

    constructor(
        private dilalogOuletService: MdlDialogOutletService, 
        private viewConatinerRef: ViewContainerRef,
        private store: Store<AppState>,
    ) {
        this.dilalogOuletService.setDefaultViewContainerRef(this.viewConatinerRef);
    }

    ngOnInit() {
        this.store.dispatch({ type: Actions.GET_MODELS });
        this.store.dispatch({ type: Actions.GET_APPLICATIONS });
        this.store.dispatch({ type: Actions.GET_RUNTIMES });
    }
}
