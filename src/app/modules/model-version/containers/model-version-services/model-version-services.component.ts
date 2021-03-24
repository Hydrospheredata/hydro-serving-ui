import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators';
import { select, Store } from '@ngrx/store';

import { ModelVersion, ModelVersionServiceStatusesEntity } from '@app/core/data/types';
import { HydroServingState } from '@app/core/store/states/root.state';
import { Get } from '@app/core/store/actions/service-statuses.actions';
import { selectServiceStatusesById } from '@app/core/store/selectors/service-statuses.selectors';

@Component({
  selector: 'hs-model-version-services',
  templateUrl: './model-version-services.component.html',
  styleUrls: ['./model-version-services.component.scss']
})
export class ModelVersionServicesComponent implements OnInit {
  @Input() modelVersion: ModelVersion;

  serviceStatuses$: Observable<ModelVersionServiceStatusesEntity>;

  constructor(private readonly store: Store<HydroServingState>) {}

  serviceStatusesById$(id: number): Observable<ModelVersionServiceStatusesEntity> {
    return this.store.pipe(
      select(selectServiceStatusesById(id))
    );
  }

  ngOnInit() {
    this.store.dispatch(Get({ payload: this.modelVersion }));
    this.serviceStatuses$ = this.serviceStatusesById$(this.modelVersion.id);
  }
}
