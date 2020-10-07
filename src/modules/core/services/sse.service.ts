import { Injectable } from '@angular/core';
import { UpdateSuccess, DeleteSuccess } from '@applications/store';
import { HS_BASE_URL } from '@core/base-url.token';
import { ModelVersionBuilder } from '@core/builders';
import { ApplicationBuilder } from '@core/builders/application.builder';
import { HydroServingState } from '@core/store';
import * as fromModels from '@models/store/actions';
import { Store } from '@ngrx/store';
import { Inject } from '@node_modules/@angular/core';
import * as fromServables from '@servables/actions';
import { Servable } from '@servables/models';
import { Application, ModelVersion } from '@shared/_index';
import { environment } from 'environments/environment';
import { DeploymentConfig } from '../../deployment-config/models';
import * as fromDepConfigs from '../../deployment-config/store/deployment-configs.actions';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private dict = new Map<string, any>([
    ['ModelRemove', modelVersionId => this.deleteModelVerions(modelVersionId)],
    ['ModelUpdate', modelVersion => this.updateModelVersion(modelVersion)],
    ['ApplicationUpdate', application => this.updateApplication(application)],
    [
      'ApplicationRemove',
      applicationName => this.deleteApplication(applicationName),
    ],
    ['ServableUpdate', servable => this.updateServable(servable)],
    ['ServableRemove', servableName => this.deleteServable(servableName)],
    ['DeploymentConfigurationUpdate', config => this.updateDepConfig(config)],
    ['DeploymentConfigurationRemove', name => this.deleteDepConfig(name)],
  ]);

  private eventSource: EventSource;

  constructor(
    private store: Store<HydroServingState>,
    private applicationBuilder: ApplicationBuilder,
    private modelVersionBuilder: ModelVersionBuilder,
    @Inject(HS_BASE_URL) private baseUrl: string
  ) {}

  createConnection() {
    const { apiUrl } = environment;

    const url = `${this.baseUrl}${apiUrl}/events`;
    this.eventSource = new EventSource(url, {
      withCredentials: true,
    });

    for (const item of this.dict) {
      this.addEventHandler(item);
    }
  }

  private updateApplication(data: Application) {
    const application = this.applicationBuilder.build(data);
    return UpdateSuccess({ payload: application });
  }

  private deleteApplication(applicationName: string) {
    return DeleteSuccess({ applicationName });
  }

  private updateModelVersion(data: ModelVersion) {
    const modelVersion = this.modelVersionBuilder.build(data);
    return fromModels.AddModelVersion({ modelVersion });
  }

  private deleteModelVerions(modelVersionId: number) {
    return fromModels.DeleteModelVersionSuccess({ modelVersionId });
  }

  private updateServable(servable: Servable) {
    return fromServables.updateServable({ servable });
  }

  private deleteServable(name: string) {
    return fromServables.deleteServableSuccess({ name });
  }

  private deleteDepConfig(name: string) {
    return fromDepConfigs.DeleteDeploymentConfigSuccess({ name });
  }

  private updateDepConfig(config: DeploymentConfig) {
    return fromDepConfigs.UpdateDeploymentConfig({ config });
  }

  private addEventHandler(item: [string, any]) {
    const [evtName, action] = item;
    this.eventSource.addEventListener(evtName, (message: MessageEvent) => {
      try {
        const myData = JSON.parse(message.data);
        this.store.dispatch(new action(myData));
      } catch (err) {
        if (message.data) {
          this.store.dispatch(new action(message.data));
        }
      }
    });
  }
}
