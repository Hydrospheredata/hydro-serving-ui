import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ExplanationRequestBody } from '@rootcause/interfaces';
import { ExplanationJob, ExplanationType } from '@rootcause/models';
import { RootCauseService } from '@rootcause/services';
import { ModelVersion } from '@shared/_index';
import { ReqstoreEntry } from '@shared/models/reqstore.model';
import { Observable } from 'rxjs';
import { QueueExplanation, GetStatus } from './root-cause.actions';
import { State } from './root-cause.reducer';
import * as rootCauseSelectors from './root-cause.selectors';

@Injectable()
export class RootCauseFacade {
  constructor(private store: Store<State>) {}

  getExplanationJob(uid: string): Observable<ExplanationJob> {
    return this.store.pipe(
      select(rootCauseSelectors.getExplanationJobById(uid))
    );
  }

  createExplanationJob({
    modelVersion,
    reqstoreEntry,
  }: {
    modelVersion: ModelVersion;
    reqstoreEntry: ReqstoreEntry;
  }): void {
    const uid = reqstoreEntry.uid + '_' + reqstoreEntry.ts;
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
    const explanationType: ExplanationType = 'rise';
    this.store.dispatch(
      QueueExplanation({ uid, requestBody, explanationType })
    );
  }

  public getStatus({
    modelVersion,
    reqstoreEntry,
  }) {
    const uid = reqstoreEntry.uid + '_' + reqstoreEntry.ts;
    const body = {
      model: {
        name: modelVersion.model.name,
        version: modelVersion.modelVersion,
      },
      explained_instance: {
        uid: +reqstoreEntry.uid,
        timestamp: +reqstoreEntry.ts,
      },
    };
    const explanationType: ExplanationType = 'rise';
    this.store.dispatch(GetStatus({ body }));
  }

  canBeExplain(modelVersion: ModelVersion): boolean {
    return true;
    // try {
    //   const isImageOrNumerical = modelVersion.modelContract.predict.inputs.some(
    //     p => p.profile === 'IMAGE'
    //   );
    //   return isImageOrNumerical;
    // } catch (error) {
    //   return false;
    // }
  }
}
