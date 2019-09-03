import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetAllStatusesParams } from '@rootcause/interfaces';
import { ExplanationTask } from '@rootcause/models';
import { ModelVersion } from '@shared/_index';
import { ReqstoreEntry } from '@shared/models/reqstore.model';
import { Observable } from 'rxjs';
import {
  GetStatuses,
  CreateExplanationTask,
  GetResult,
  ContinuePollingExplanationTask,
} from './root-cause.actions';
import { State } from './root-cause.reducer';
import * as rootCauseSelectors from './root-cause.selectors';

@Injectable()
export class RootCauseFacade {
  constructor(private store: Store<State>) {}

  getTasks(uid: string): Observable<ExplanationTask[]> {
    return this.store.pipe(select(rootCauseSelectors.selectEntryMethods(uid)));
  }

  createExplanationTask({
    modelVersion,
    reqstoreEntry,
    method,
  }: {
    modelVersion: ModelVersion;
    reqstoreEntry: ReqstoreEntry;
    method: string;
  }): void {
    const uid = reqstoreEntry.uid;
    const requestBody = {
      model: {
        name: modelVersion.model.name,
        version: modelVersion.modelVersion,
      },
      explained_instance: {
        uid: +reqstoreEntry.uid,
        timestamp: +reqstoreEntry.ts,
      },
    };
    this.store.dispatch(CreateExplanationTask({ uid, requestBody, method }));
  }

  getResult({ uid, task }: { uid: string; task: ExplanationTask }) {
    this.store.dispatch(
      GetResult({ uid, method: task.method, result: task.status.result })
    );
  }

  getAllStatuses({ params }: { params: GetAllStatusesParams }): void {
    this.store.dispatch(GetStatuses({ params }));
  }

  fetchExplanation({
    uid,
    taskId,
    method,
  }: {
    uid: string;
    taskId: string;
    method: string;
  }): void {
    this.store.dispatch(
      ContinuePollingExplanationTask({ uid, taskId, method })
    );
  }
}
