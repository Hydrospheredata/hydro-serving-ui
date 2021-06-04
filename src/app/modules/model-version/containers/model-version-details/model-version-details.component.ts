import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ServablesFacade } from '@app/core/facades/servables.facade';
import { FieldsService } from '@app/modules/profiler/fields.service';

import { Observable, combineLatest, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { neitherNullNorUndefined } from '@app/utils';

import {
  ModelVersion,
  Servable,
  Application,
  DeploymentConfig,
} from '@app/core/data/types';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { HydroConfigService } from '@app/core/hydro-config.service';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { LogsService } from '@app/modules/model-version/logs.service';

@Component({
  templateUrl: './model-version-details.component.html',
  styleUrls: ['./model-version-details.component.scss'],
})
export class ModelVersionDetailsComponent implements OnInit, OnDestroy {
  modelVersion$: Observable<ModelVersion>;
  servables$: Observable<Servable[]>;
  applications$: Observable<Application[]>;
  fields$: Observable<Map<string, string[]>>;

  isReleased: boolean = true;
  isFailed: boolean = false;
  depConfig: DeploymentConfig;
  depConfigSub: Subscription;

  constructor(
    private readonly facade: ModelVersionsFacade,
    private readonly hsConfig: HydroConfigService,
    private readonly applicationsFacade: ApplicationsFacade,
    private readonly servablesFacade: ServablesFacade,
    private readonly modelsFacade: ModelsFacade,
    private readonly depConfigsFacade: DeploymentConfigsFacade,
    private readonly fields: FieldsService,
    private readonly logs: LogsService,
  ) {}

  ngOnInit() {
    this.modelVersion$ = this.facade
      .selectedModelVersion()
      .pipe(neitherNullNorUndefined);

    this.servables$ = combineLatest([
      this.modelVersion$,
      this.servablesFacade.allServables(),
    ]).pipe(
      map(([modelVersion, servables]) => {
        return servables.filter(
          servable => servable.modelVersionId === modelVersion.id,
        );
      }),
    );

    this.applications$ = this.modelVersion$.pipe(
      switchMap(modelVersions =>
        this.applicationsFacade.selectApplicationsByNames(
          modelVersions.applications,
        ),
      ),
    );

    this.fields$ = this.fields.getFields();

    this.depConfigSub = this.depConfigsFacade
      .defaultDepConfig()
      .subscribe(depConfig => (this.depConfig = depConfig));
  }

  ngOnDestroy() {
    this.depConfigSub.unsubscribe();
  }

  isButtonEnabled() {
    return combineLatest([
      this.someModelVersionIsReleased(),
      this.getDepConfigs(),
    ]).pipe(
      map(([someReleased, depConfigs]) => {
        return someReleased && depConfigs.length > 0;
      }),
    );
  }

  someModelVersionIsReleased(): Observable<boolean> {
    return this.modelsFacade.someModelVersionIsReleased();
  }

  getDepConfigs(): Observable<DeploymentConfig[]> {
    return this.depConfigsFacade.getAll();
  }

  showBuildLog(modelVersionId: number) {
    this.logs.showBuildLog(modelVersionId);
  }

  onAddApplication(modelVersion: ModelVersion, depConfig: DeploymentConfig) {
    this.applicationsFacade.createApplicationFromModelVersion(
      modelVersion,
      depConfig,
    );
  }

  showServableLogs(name: string) {
    this.logs.showServableLogs(name);
  }
}
