import { Injectable } from '@angular/core';
import { ProfilerService } from '@core/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  GetProfiles,
  GetProfilesSuccess,
  GetProfilesFail,
  GetFields,
  GetFieldsSuccess,
  GetFieldsFail,
} from '@profiler/store/actions';
import { Profiles } from '@shared/models/profiles.model';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ProfilesEffects {
  @Effect() loadProfiles$ = this.actions$.pipe(
    ofType(GetProfiles),
    switchMap(({ modelVersionId, fieldName }) =>
      this.profilerService.getProfiles(modelVersionId, fieldName).pipe(
        map(data => GetProfilesSuccess({ payload: new Profiles(data) })),
        catchError(error => of(GetProfilesFail({ error })))
      )
    )
  );

  @Effect() loadFields$ = this.actions$.pipe(
    ofType(GetFields),
    switchMap(({ modelVersionId }) =>
      this.profilerService.getFields(modelVersionId).pipe(
        map(data => GetFieldsSuccess({ payload: data })),
        catchError(error =>
          of(GetFieldsFail({error}))
        )
      )
    )
  );

  constructor(
    private profilerService: ProfilerService,
    private actions$: Actions
  ) {}
}
