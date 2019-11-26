import { Injectable } from '@angular/core';
import { ProfilerService } from '@core/services';
import { ModelsFacade } from '@models/store';
import { Store, select } from '@ngrx/store';
import { Profiles } from '@shared/_index';
import { Subject, combineLatest, timer, of, Observable } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  publish,
  refCount,
  startWith,
} from 'rxjs/operators';
import {
  GetProfilerServiceStatus,
  CleanProfiles,
  GetProfilesFail,
  GetFieldsFail,
} from './actions';
import { ProfilerState } from './reducers';
import { selectErrorMessage, selectProfilerServiceStatus } from './selectors';
@Injectable()
export class ProfilerFacade {
  error$ = this.store.pipe(select(selectErrorMessage));
  serviceStatus$ = this.store.select(selectProfilerServiceStatus);
  modelVersion$ = this.modelsFacade.selectedModelVersion$;
  selectedField = new Subject<string>();
  selectedField$ = this.selectedField.asObservable();

  fields$: Observable<string[]> = this.modelVersion$.pipe(
    switchMap(({ id }) => {
      return this.profilerService.getFields(`${id}`).pipe(
        catchError(error => {
          this.store.dispatch(GetFieldsFail({ error }));
          return of([]);
        })
      );
    }),
    publish(),
    refCount(),
    startWith([])
  );
  profiles$: Observable<Profiles> = combineLatest(
    this.modelVersion$,
    this.selectedField$
  ).pipe(
    switchMap(([modelVersion, field]) =>
      timer(0, 5000).pipe(
        switchMap(() => {
          return this.profilerService.getProfiles(modelVersion.id, field).pipe(
            map(data => new Profiles(data)),
            catchError(error => {
              this.store.dispatch(GetProfilesFail({ error }));
              return of(null);
            })
          );
        })
      )
    )
  );

  constructor(
    private store: Store<ProfilerState>,
    private modelsFacade: ModelsFacade,
    private profilerService: ProfilerService
  ) {}

  getProfilerServiceStatus(): void {
    this.store.dispatch(GetProfilerServiceStatus());
  }

  cleanProfiles(): void {
    this.store.dispatch(CleanProfiles());
  }
}
