import { Component, Input, OnDestroy } from '@angular/core';
import { ProfilerFacade } from '@profiler/store';
import { Profiles } from '@shared/_index';

@Component({
  selector: 'hs-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnDestroy {
  @Input() modelVersionId: number;
  error$ = this.profilerFacade.error$;
  selectField$ = this.profilerFacade.selectedField$;
  profiles$ = this.profilerFacade.profiles$;
  fields$ = this.profilerFacade.fields$;

  constructor(private profilerFacade: ProfilerFacade) {}

  ngOnDestroy() {
    this.profilerFacade.cleanProfiles();
  }

  onFieldSelect(selectedField) {
    this.profilerFacade.selectedField.next(selectedField);
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
