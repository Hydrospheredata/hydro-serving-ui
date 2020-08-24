import { MdlDialogOutletService } from '@angular-mdl/core';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import * as fromApplications from '@applications/store';
import { SvgSpriteService } from '@core/services';
import { BuildInformationService } from '@core/services/build-information.service';
import { HydroConfigService } from '@core/services/hydro-config.service';
import { SseService } from '@core/services/sse.service';
import { HydroServingState } from '@core/store';
import * as fromModels from '@models/store';
import { Store } from '@ngrx/store';
import * as fromServables from 'modules/servables/actions';
import { GetDeploymentConfigs } from '../modules/deployment-config/store';

@Component({
  selector: 'hs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private dialogOutletService: MdlDialogOutletService,
    private viewContainerRef: ViewContainerRef,
    private store: Store<HydroServingState>,
    private svgSprite: SvgSpriteService,
    private sse: SseService,
    private buildInformationService: BuildInformationService,
    private hsConfig: HydroConfigService
  ) {
    this.dialogOutletService.setDefaultViewContainerRef(this.viewContainerRef);
  }

  ngOnInit() {
    this.sse.createConnection();
    this.svgSprite.loadSvgSprite();

    this.store.dispatch(fromModels.GetModels());
    this.store.dispatch(fromModels.GetModelVersions());
    this.store.dispatch(fromApplications.Get());
    this.store.dispatch(fromServables.getAll());
    this.store.dispatch(GetDeploymentConfigs());

    this.buildInformationService.loadBuildInformation();
  }

  get showHeader(): boolean {
    return this.hsConfig.config.showHeader;
  }
}
