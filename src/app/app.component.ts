import { MdlDialogOutletService } from '@angular-mdl/core';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import * as fromApplications from '@applications/store';
import { SvgSpriteService } from '@core/services';
import { SseService } from '@core/services/sse.service';
import { HydroServingState } from '@core/store';
import * as fromModels from '@models/store';
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
    this.store.dispatch(fromModels.GetModels());
    this.store.dispatch(fromModels.GetModelVersions());
    this.store.dispatch(fromApplications.Get());
    this.store.dispatch(fromServables.getAll());
  }
}
