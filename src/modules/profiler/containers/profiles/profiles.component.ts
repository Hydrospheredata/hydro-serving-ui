import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilerFacade } from '@profiler/store';
import { Profiles, ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnDestroy, OnInit {
  @Input() modelVersion: ModelVersion;
  @Input() featureName: string;
  @Input() featureNames: string[] = [];
  @Input() profiles: Profiles;
  error$ = this.profilerFacade.error$;
  selectField$ = this.profilerFacade.selectedField$;
  featureName$ = this.profilerFacade.selectedFeatureName$;

  constructor(private profilerFacade: ProfilerFacade, private router: Router) {}

  ngOnInit(): void {
    this.profilerFacade.selectedField.next(this.featureName);
  }

  ngOnDestroy() {
    this.profilerFacade.cleanProfiles();
  }

  onFieldSelect(selectedField) {
    this.router.navigate([
      'models',
      this.modelVersion.model.id,
      this.modelVersion.id,
      'details',
      'profile',
      selectedField,
    ]);
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
