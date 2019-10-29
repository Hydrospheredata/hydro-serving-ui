import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetProfilerServiceStatus } from './actions';
import { ProfilerState } from './reducers';
import { selectErrorMessage, selectProfilerServiceStatus } from './selectors';
@Injectable()
export class ProfilerFacade {
  error$ = this.store.pipe(select(selectErrorMessage));
  serviceStatus$ = this.store.select(selectProfilerServiceStatus);
  constructor(private store: Store<ProfilerState>) {}
  getProfilerServiceStatus(): void {
    this.store.dispatch(GetProfilerServiceStatus());
  }
}
