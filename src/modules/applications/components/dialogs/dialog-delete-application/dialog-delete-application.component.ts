import { Component, InjectionToken, Inject } from '@angular/core';
import { DeleteApplicationAction } from '@applications/actions/applications.actions';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { DialogService } from '@dialog/dialog.service';
import { IApplication } from '@shared/_index';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

export const SELECTED_DEL_APPLICATION$ = new InjectionToken<
  Observable<IApplication>
>('selectedApplication');

@Component({
  templateUrl: './dialog-delete-application.component.html',
})
export class DialogDeleteApplicationComponent {
  private application: IApplication;

  get name(): string {
    return this.application.name;
  }

  constructor(
    public dialog: DialogService,
    private store: Store<HydroServingState>,
    @Inject(SELECTED_DEL_APPLICATION$)
    private application$: Observable<IApplication>
  ) {
    this.application$
      .pipe(
        take(1),
        tap(application => {
          this.application = application;
        })
      )
      .subscribe();
  }

  public onDelete() {
    this.store.dispatch(new DeleteApplicationAction(this.application));
    this.dialog.closeDialog();
  }
}
