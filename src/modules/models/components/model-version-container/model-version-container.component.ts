import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { GetMetricsAction } from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  templateUrl: './model-version-container.component.html',
  styleUrls: ['./model-version-container.component.scss'],
})
export class ModelVersionContainerComponent {
  public modelVersion$: Observable<IModelVersion>;

  constructor(
    private store: Store<HydroServingState>,
    private location: Location
  ) {
    // TODO: fix side effect
    this.modelVersion$ = this.store.select(getSelectedModelVersion).pipe(
      filter(_ => !!_),
      tap(_ => this.store.dispatch(new GetMetricsAction(`${_.id}`)))
    );
  }

  back() {
    this.location.back();
  }
}
