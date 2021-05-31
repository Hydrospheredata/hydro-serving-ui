import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { DeploymentConfig, ModelVersion } from '@app/core/data/types';
import { Application, ApplicationCreatingRequest } from '@app/core/data/types';
import { NameGenerator } from '@app/core/name-generator';
import { HydroServingState } from '@app/core/store/states/root.state';
import {
  selectSelectedApplication,
  selectAllApplications,
  selectApplicationsByNames,
  selectApplicationLoaded,
} from '@app/core/store/selectors/applications.selectors';

import {
  Add,
  Delete,
  Get,
  Update,
  ToggleFavorite,
} from '../store/actions/applications.actions';

@Injectable({ providedIn: 'root' })
export class ApplicationsFacade {
  constructor(
    private readonly store: Store<HydroServingState>,
    private nameGenerator: NameGenerator
  ) {}

  loadAll(): void {
    this.store.dispatch(Get());
  }

  deleteApplication(application: Application): void {
    this.store.dispatch(Delete({ application }));
  }

  createApplicationFromModelVersion(
    modelVersion: ModelVersion,
    depConfig: DeploymentConfig
  ) {
    this.allApplications()
      .pipe(first())
      .subscribe(applications => {
        const isNotUniqName = str =>
          applications.some(({ name }) => name === str);
        const generateUniqName = () =>
          `${modelVersion.model.name}_v${
            modelVersion.modelVersion
          }_${this.nameGenerator.generate()}`;

        let uniqName = generateUniqName();

        while (isNotUniqName(uniqName)) {
          uniqName = generateUniqName();
        }

        this.addApplication({
          name: uniqName,
          kafkaStreaming: [],
          executionGraph: {
            stages: [
              {
                modelVariants: [
                  { modelVersionId: modelVersion.id, weight: 100 },
                ],
              },
            ],
          },
          deploymentConfiguration: depConfig,
        });
      });
  }

  public addApplication(data: ApplicationCreatingRequest) {
    this.store.dispatch(Add({ application: new Application(data) }));
  }

  allApplications(): Observable<Application[]> {
    return this.store.pipe(select(selectAllApplications));
  }

  selectedApplication(): Observable<Application> {
    return this.store.pipe(select(selectSelectedApplication));
  }

  selectApplicationsByNames(names: string[]): Observable<Application[]> {
    return this.store.pipe(select(selectApplicationsByNames(names)));
  }

  editApplication(application: Application): void {
    this.store.dispatch(Update({ application }));
  }

  toggleFavorite(application: Application) {
    this.store.dispatch(ToggleFavorite({ payload: { application } }));
  }

  areApplicationsLoaded() {
    return this.store.pipe(select(selectApplicationLoaded));
  }
}
