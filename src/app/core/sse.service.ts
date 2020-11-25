import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Inject } from '@angular/core';

import { environment } from 'environments/environment';
import { HS_BASE_URL } from '@app/core/base-url.token';
import { Application, ModelVersion, Servable } from './data/types';
import { ModelVersionBuilder, ApplicationBuilder } from './data/builders';

import { HydroServingState } from './store/states/root.state';
import * as fromApplications from './store/actions/applications.actions';
import * as fromModelVersions from './store/actions/model-versions.actions';
import * as fromServables from './store/actions/servables.actions';

const enum SSEEvents {
  ModelRemove = 'ModelRemove',
  ModelUpdate = 'ModelUpdate',
  ApplicationUpdate = 'ApplicationUpdate',
  ApplicationRemove = 'ApplicationRemove',
  ServableUpdate = 'ServableUpdate',
  ServableRemove = 'ServableRemove',
}

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private dict = new Map<string, any>([
    [
      SSEEvents.ModelRemove,
      modelVersionId => this.deleteModelVerions(modelVersionId),
    ],
    [
      SSEEvents.ModelUpdate,
      modelVersion => this.updateModelVersion(modelVersion),
    ],
    [
      SSEEvents.ApplicationUpdate,
      application => this.updateApplication(application),
    ],
    [
      SSEEvents.ApplicationRemove,
      applicationName => this.deleteApplication(applicationName),
    ],
    [SSEEvents.ServableUpdate, servable => this.updateServable(servable)],
    [
      SSEEvents.ServableRemove,
      servableName => this.deleteServable(servableName),
    ],
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
    return fromApplications.UpdateSuccess({ payload: application });
  }

  private deleteApplication(applicationName: string) {
    return fromApplications.DeleteSuccess({ applicationName });
  }

  private updateModelVersion(data: ModelVersion) {
    const modelVersion = this.modelVersionBuilder.build(data);
    return fromModelVersions.AddModelVersion({ modelVersion });
  }

  private deleteModelVerions(modelVersionId: number) {
    return fromModelVersions.DeleteModelVersionSuccess({ modelVersionId });
  }

  private updateServable(servable: Servable) {
    return fromServables.updateServable({ servable });
  }

  private deleteServable(name: string) {
    return fromServables.deleteServableSuccess({ name });
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
