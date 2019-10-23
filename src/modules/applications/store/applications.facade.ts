import { Injectable } from '@angular/core';
import { ApplicationCreatingRequest } from '@applications/interfaces';
import {
  selectAllApplications,
  selectSelectedApplication,
  selectApplicationLoaded,
  selectTestingDialogState,
} from '@applications/store/selectors';
import { NameGenerator } from '@core/services';
import { Store, select } from '@ngrx/store';
import { Application, ModelVersion } from '@shared/_index';
import { filter, share, first } from 'rxjs/operators';
import {
  Add,
  Delete,
  Test,
  SetInput,
  GenerateInput,
  Update,
  ClearTestingDialog,
} from '../store/actions';
import { State } from './reducers';

@Injectable()
export class ApplicationsFacade {
  public allApplications$ = this.store.pipe(
    select(selectAllApplications),
    filter(val => val !== undefined)
  );

  public selectedApplication$ = this.store.pipe(
    select(selectSelectedApplication),
    filter(val => val !== undefined)
  );

  public applicationsLoaded$ = this.store.pipe(select(selectApplicationLoaded));

  testingDialogState$ = this.store.pipe(
    select(selectTestingDialogState),
    filter(val => val !== undefined),
    share()
  );

  constructor(
    private store: Store<State>,
    private nameGenerator: NameGenerator
  ) {}

  public createApplicationFromModelVersion(modelVersion: ModelVersion) {
    this.allApplications$.pipe(first()).subscribe(applications => {
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
              modelVariants: [{ modelVersionId: modelVersion.id, weight: 100 }],
            },
          ],
        },
      });
    });
  }

  public addApplication(data: ApplicationCreatingRequest) {
    this.store.dispatch(Add({ application: new Application(data) }));
  }

  public editApplication(application: Application) {
    this.store.dispatch(Update({ application }));
  }

  public deleteApplication(application: Application) {
    this.store.dispatch(Delete({ application }));
  }

  public testApplication(application: Application) {
    this.store.dispatch(Test({ payload: application }));
  }

  public setInput(input: any) {
    this.store.dispatch(SetInput({ payload: input }));
  }

  public generateInput() {
    this.store.dispatch(GenerateInput());
  }

  public clearTestingDialog() {
    this.store.dispatch(ClearTestingDialog());
  }
}
