import { MdlDialogOutletService } from '@angular-mdl/core';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { GetApplicationsAction } from '@applications/actions';

import * as Actions from '@core/actions';
import { HydroServingState } from '@core/reducers';
import { SvgSpriteService } from '@core/services';
import { SseService } from '@core/services/sse.service';
import { GetModelsAction, GetModelVersionsAction } from '@models/actions';
import { Store } from '@ngrx/store';
import * as fromServables from 'modules/servables/actions';

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
    private svgSprite: SvgSpriteService,
    private sse: SseService
  ) {
    this.dialogOutletService.setDefaultViewContainerRef(this.viewConatinerRef);
  }

  ngOnInit() {
    this.sse.createConnection();

    this.svgSprite.loadSvgSprite();
    this.store.dispatch(new GetModelsAction());
    this.store.dispatch(new GetApplicationsAction());
    this.store.dispatch(new GetModelVersionsAction());
    this.store.dispatch(fromServables.getAll());
  }
}
