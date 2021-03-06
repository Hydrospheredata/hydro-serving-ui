import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FavoriteService } from '@app/core/favorite.service';

import { ApplicationService } from '../../data/services/application.service';
import { ApplicationBuilder } from '../../data/builders/application.builder';

import {
  Get,
  GetSuccess,
  GetFail,
  Add,
  AddSuccess,
  AddFail,
  Update,
  UpdateSuccess,
  UpdateFail,
  Delete,
  DeleteSuccess,
  DeleteFail,
  GenerateInput,
  GenerateInputSuccess,
  GenerateInputFail,
  SetInputSuccess,
  Test,
  TestSuccess,
  TestFail,
  SetInput,
  ToggleFavorite,
} from '../actions/applications.actions';
import { selectSelectedApplication } from '../selectors/applications.selectors';
import { SnackbarService } from '../../snackbar.service';

import { HydroServingState } from '@app/core/store/states/root.state';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Application } from '@app/core/data/types';
import { of } from 'rxjs';
import {
  switchMap,
  catchError,
  withLatestFrom,
  skip,
  map,
  tap,
} from 'rxjs/operators';

@Injectable()
export class ApplicationsEffects {
  getApplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Get),
      switchMap(() =>
        this.applicationsService.getApplications().pipe(
          map((result: Application[]) => {
            const applications = result
              .map(app => this.applicationBuilder.build(app))
              .map(app => {
                return {
                  ...app,
                  favorite: this.favoriteService.isFavorite(app.name),
                };
              });
            return GetSuccess({ payload: applications });
          }),
          catchError(error => {
            this.snackbar.show({ message: 'Failed to load applications' });
            return of(GetFail({ error }));
          })
        )
      )
    )
  );

  addApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Add),
      switchMap(({ application }) =>
        this.applicationsService.addApplication(application).pipe(
          map(response => {
            this.snackbar.show({
              message: 'Application was successfully added',
            });

            this.router.navigate(['/applications', response.name]);

            const app = this.applicationBuilder.build(response);
            return AddSuccess({ payload: app });
          }),
          catchError(error => {
            this.snackbar.show({
              message: `Error: ${error}`,
            });
            return of(AddFail({ error }));
          })
        )
      )
    )
  );

  updateApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Update),
      switchMap(({ application }) =>
        this.applicationsService.updateApplication(application).pipe(
          map(response => {
            this.snackbar.show({
              message: 'Application was successfully updated',
            });
            const app = this.applicationBuilder.build(response);
            return UpdateSuccess({ payload: app });
          }),
          catchError(error => {
            this.snackbar.show({
              message: `Error: ${error}`,
            });
            return of(UpdateFail({ error }));
          })
        )
      )
    )
  );

  deleteApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Delete),
      switchMap(({ application: { name } }) =>
        this.applicationsService.deleteApplication(name).pipe(
          map(() => {
            this.router.navigate(['applications']);
            this.snackbar.show({
              message: 'Application has been deleted',
            });
            return DeleteSuccess({ applicationName: name });
          }),
          catchError(error => {
            this.snackbar.show({
              message: `Error: ${error}`,
            });
            return of(DeleteFail({ error }));
          })
        )
      )
    )
  );

  generateInputs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenerateInput),
      withLatestFrom(this.store.select(selectSelectedApplication)),
      switchMap(([_, { name: applicationName }]) =>
        this.applicationsService.generateInputs(applicationName).pipe(
          map(input => {
            const payload = {
              name: applicationName,
              input: JSON.stringify(input, undefined, 2),
            };
            return GenerateInputSuccess({ payload });
          }),
          catchError(error => {
            return of(GenerateInputFail({ error }));
          })
        )
      )
    )
  );

  setInputs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetInput),
      skip(1),
      map(action => action.payload),
      withLatestFrom(this.store.select(selectSelectedApplication)),
      switchMap(([input, { name }]) => {
        return of(SetInputSuccess({ payload: { name, input } }));
      })
    )
  );

  testApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Test),
      withLatestFrom(this.store.select(selectSelectedApplication)),
      switchMap(([_, { name, input }]) =>
        this.applicationsService.serveService(JSON.parse(input), name).pipe(
          map(output =>
            TestSuccess({
              payload: {
                name,
                output: JSON.stringify(output, undefined, 2),
              },
            })
          ),
          catchError(error => of(TestFail({ payload: { name, error } })))
        )
      )
    )
  );

  toggleFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToggleFavorite),
        tap(({ payload: { application } }) => {
          application.favorite
            ? this.favoriteService.remove(application.name)
            : this.favoriteService.add(application.name);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private applicationsService: ApplicationService,
    private applicationBuilder: ApplicationBuilder,
    private snackbar: SnackbarService,
    private store: Store<HydroServingState>,
    private favoriteService: FavoriteService
  ) {}
}
