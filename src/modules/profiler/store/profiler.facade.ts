import { Injectable } from '@angular/core';
import { ProfilerService } from '@core/services';
import { Store, select } from '@ngrx/store';
import { Profiles } from '@shared/_index';
import { timer, of, Observable, BehaviorSubject } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  filter,
} from 'rxjs/operators';
import {
  GetProfilerServiceStatus,
  CleanProfiles,
  GetProfilesFail,
  GetFieldsFail,
} from './actions';
import { ProfilerState } from './reducers';
import {
  selectErrorMessage,
  selectProfilerServiceStatus,
  selectSelectedFeatureName,
} from './selectors';
@Injectable()
export class ProfilerFacade {
  error$ = this.store.pipe(select(selectErrorMessage));
  serviceStatus$ = this.store.select(selectProfilerServiceStatus);
  selectedField = new BehaviorSubject<string>(undefined);
  selectedField$ = this.selectedField
    .asObservable()
    .pipe(filter(val => val !== undefined));

  selectedFeatureName$ = this.store.pipe(
    select(selectSelectedFeatureName),
    filter(val => val !== undefined)
  );

  constructor(
    private store: Store<ProfilerState>,
    private profilerService: ProfilerService
  ) {}

  getProfilerServiceStatus(): void {
    this.store.dispatch(GetProfilerServiceStatus());
  }

  cleanProfiles(): void {
    this.store.dispatch(CleanProfiles());
  }

  loadFields: (modelVersionId) => Observable<string[]> = modelVersionId => {
    return this.profilerService.getFields(`${modelVersionId}`).pipe(
      catchError(error => {
        this.store.dispatch(GetFieldsFail({ error }));
        return of([]);
      })
    );
  }

  loadProfiles: (modelVerId, fieldName) => Observable<Profiles> = (modelVerId, fieldName) => {
    return timer(0, 5000).pipe(
      switchMap(() => {
        return this.profilerService.getProfiles(modelVerId, fieldName).pipe(
          map(data => new Profiles(data)),
          catchError(error => {
            this.store.dispatch(GetProfilesFail({ error }));
            return of(null);
          })
        );
      })
    );
  }
}
