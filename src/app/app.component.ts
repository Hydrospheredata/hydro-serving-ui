import { MdlDialogOutletService } from '@angular-mdl/core';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { BuildInformationService } from '@app/core/build-information.service';

import { ApplicationsFacade } from './core/facades/applications.facade';
import { DeploymentConfigsFacade } from './core/facades/deployment-configs.facade';
import { ModelsFacade } from './core/facades/models.facade';
import { ServablesFacade } from './core/facades/servables.facade';
import { SvgSpriteService } from './core/svg-sprite.service';
import { SseService } from './core/sse.service';
import { ModelVersionsFacade } from './core/facades/model-versions.facade';

@Component({
  selector: 'hs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private dialogOutletService: MdlDialogOutletService,
    private viewContainerRef: ViewContainerRef,
    private sse: SseService,
    private buildInformationService: BuildInformationService,
    // private hsConfig: HydroConfigService,
    private readonly appFacade: ApplicationsFacade,
    private readonly modelsFacade: ModelsFacade,
    private readonly modelVersionsFacade: ModelVersionsFacade,
    private readonly servablesFacade: ServablesFacade,
    private readonly deploymentConfigFacade: DeploymentConfigsFacade,
    private readonly svgSprite: SvgSpriteService
  ) {
    this.dialogOutletService.setDefaultViewContainerRef(this.viewContainerRef);

    appFacade.loadAll();
    modelsFacade.loadAll();
    modelVersionsFacade.loadAll();
    servablesFacade.loadAll();
    deploymentConfigFacade.loadAll();
    svgSprite.loadSvgSprite();
    sse.createConnection();
  }

  ngOnInit() {
    this.buildInformationService.loadBuildInformation();
  }

  get showHeader(): boolean {
    return true;
    // return this.hsConfig.config.showHeader;
  }
}
