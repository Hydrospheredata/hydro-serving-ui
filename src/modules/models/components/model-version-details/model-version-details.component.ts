import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, merge } from 'rxjs';

import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers';
import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { ModelVersion } from '@shared/models/_index';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hydro-model-version-details',
  templateUrl: './model-version-details.component.html',
  styleUrls: ['./model-version-details.component.scss'],
  providers: [ModelVersionLogService],
})
export class ModelVersionDetailsComponent {
  modelVersion$: Observable<ModelVersion>;
  showLog: boolean = false;

  constructor(private store: Store<HydroServingState>) {
    this.modelVersion$ = this.store
      .select(fromModels.getSelectedModelVersion)
      .pipe(filter(mv => !!mv));
  }

  toggleLog(): void {
    this.showLog = !this.showLog;
  }
}
