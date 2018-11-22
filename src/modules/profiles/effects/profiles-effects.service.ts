
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Profiles } from '@shared/models/profiles.model';
import {of as observableOf,  Observable } from 'rxjs';
import { flatMap, map, catchError } from 'rxjs/operators';
import * as HydroActions from './../actions/profiles.actions';
import { ProfilerService } from './../services/profiler.service';

@Injectable()
export class ProfilesEffects {

  @Effect() loadProfiles$: Observable<Action> = this.actions$
    .ofType(HydroActions.ProfilesActionTypes.GetProfiles)
    .pipe(
      map((action: HydroActions.GetProfilesAction) => [action.modelVersionId, action.fieldName]),
      flatMap((params: [number, string]) => this.profilerService
        .getProfiles(params[0], params[1])
        .pipe(
          map(data => new HydroActions.GetProfilesSuccessAction(new Profiles(data))),
          catchError(error => observableOf(new HydroActions.GetProfilesFailAction(error)))
        )
      )
    );

  @Effect() loadFields$: Observable<Action> = this.actions$
    .ofType(HydroActions.ProfilesActionTypes.GetFields)
    .pipe(
      map((action: HydroActions.GetFieldsAction) => action.modelVersionId),
      flatMap((modelVersionId: number) => this.profilerService
        .getFields(modelVersionId)
        .pipe(
          map(data => new HydroActions.GetFieldsSuccessAction(data)),
          catchError(error => observableOf(new HydroActions.GetFieldsFailAction(error)))
        )
      )
    );

  constructor(
    private profilerService: ProfilerService,
    private actions$: Actions
  ) {}
}
