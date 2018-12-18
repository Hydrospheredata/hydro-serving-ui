import { MdlDialogOutletService } from '@angular-mdl/core';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { GetApplicationsAction } from '@applications/actions';

import * as Actions from '@core/actions';
import { HydroServingState } from '@core/reducers';
import { SvgSpriteService } from '@core/services';
import { GetModelsAction, GetModelVersionsAction } from '@models/actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'hs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    constructor(
        private dialogOutletService: MdlDialogOutletService,
        private viewConatinerRef: ViewContainerRef,
        private store: Store<HydroServingState>,
        private svgSprite: SvgSpriteService
    ) {
        this.dialogOutletService.setDefaultViewContainerRef(this.viewConatinerRef);
    }

    ngOnInit() {
        this.svgSprite.loadSvgSprite();

        this.store.dispatch(new GetModelsAction());
        this.store.dispatch(new GetApplicationsAction());
        this.store.dispatch({ type: Actions.GET_RUNTIMES });
        this.store.dispatch({ type: Actions.GET_ENVIRONMENTS });
        this.store.dispatch(new GetModelVersionsAction());
    }
}
