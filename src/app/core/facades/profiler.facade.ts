import { Profiles } from '@app/core/data/types';
import { Injectable } from '@angular/core';
import { HydroServingState } from '@app/core/store/states/root.state';
import { Store, select } from '@ngrx/store';
import { neitherNullNorUndefined } from '@app/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectRouterParams } from '../store/selectors/router.selectors';
import { ProfilerService } from '../data/services/profiler.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilerFacade {
  private readonly polling;
  constructor(
    private store: Store<HydroServingState>,
    private profilerService: ProfilerService,
  ) {}

  selectedField(): Observable<string> {
    return this.store.pipe(
      select(selectRouterParams),
      map(({ params }) => {
        return params && params['featureName'];
      }),
      neitherNullNorUndefined,
    );
  }

  loadFields: (modelVersionId) => Observable<string[]> = modelVersionId => {
    return this.profilerService.getFields(`${modelVersionId}`);
  };

  loadProfiles: (modelVerId, fieldName) => Observable<Profiles> = (
    modelVerId,
    fieldName,
  ) => {
    return this.profilerService
      .getProfiles(modelVerId, fieldName)
      .pipe(map(data => new Profiles(data)));
  };
}
