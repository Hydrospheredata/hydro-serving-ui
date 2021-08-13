import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

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
  private readonly filterString = new BehaviorSubject('');
  private readonly filterString$ = this.filterString.asObservable();

  constructor(
    private readonly store: Store<HydroServingState>,
    private nameGenerator: NameGenerator,
  ) {}

  loadAll(): void {
    this.store.dispatch(Get());
  }

  deleteApplication(application: Application): void {
    this.store.dispatch(Delete({ application }));
  }

  createApplicationFromModelVersion(
    modelVersion: ModelVersion,
    depConfig: DeploymentConfig,
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

  filteredApplications(): Observable<Application[]> {
    return combineLatest([this.filterString$, this.allApplications()]).pipe(
      map(([filter, applications]) => {
        return filter
          ? applications.filter(({ name }) => name.includes(filter))
          : applications;
      }),
    );
  }

  nonFavoriteApplications$ = this.filteredApplications().pipe(
    map(apps => apps.filter(app => !app.favorite)),
  );

  favoriteApplications$ = this.filteredApplications().pipe(
    map(apps => apps.filter(app => app.favorite)),
  );

  visibleApplications(): Observable<Application[]> {
      return combineLatest(
        this.favoriteApplications$,
        this.nonFavoriteApplications$,
      ).pipe(map(([favorites, nonFavorites]) => [...favorites, ...nonFavorites]));
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

  onFilter(str: string): void {
    this.filterString.next(str);
  }
}
