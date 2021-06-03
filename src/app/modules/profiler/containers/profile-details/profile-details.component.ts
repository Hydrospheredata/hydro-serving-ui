import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { FieldsService } from '@app/modules/profiler/fields.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import { take, switchMap, map } from 'rxjs/operators';

import { ProfilerFacade } from '@app/core/facades/profiler.facade';
import { Profiles } from '@app/core/data/types';

@Component({
  selector: 'hs-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  readonly fields$: Observable<string>;
  readonly error$ = new Subject<string>();
  readonly selectedField$: Observable<string>;
  readonly profiles$: Observable<Profiles>;

  constructor(
    private readonly modelVersionsFacade: ModelVersionsFacade,
    private readonly profilerFacade: ProfilerFacade,
    private readonly router: Router,
    private readonly fieldsService: FieldsService
  ) {
    this.selectedField$ = profilerFacade.selectedField();

    this.profiles$ = combineLatest([
      this.modelVersionsFacade.selectedModelVersion(),
      this.selectedField$,
    ]).pipe(
      switchMap(([mv, field]) => this.profilerFacade.loadProfiles(mv.id, field))
    );

    this.fields$ = combineLatest([
      this.fieldsService.getFields(),
      this.selectedField$,
    ]).pipe(map(([dict, fieldName]) => dict[fieldName]));
  }

  onFieldSelect(selectedField) {
    this.modelVersionsFacade
      .selectedModelVersion()
      .pipe(take(1))
      .subscribe(modelVersion => {
        this.router.navigate([
          'models',
          modelVersion.model.id,
          modelVersion.id,
          'details',
          'profile',
          selectedField,
        ]);
      });
  }

  showHistogram(profiles: Profiles): boolean {
    return (
      (profiles.trainingProfile &&
        profiles.trainingProfile.kind === 'NumericalProfile') ||
      (profiles.productionProfile &&
        profiles.productionProfile.kind === 'NumericalProfile')
    );
  }
}
