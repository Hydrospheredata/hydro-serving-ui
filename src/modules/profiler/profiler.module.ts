import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, ProfilerFacade, ProfilerEffects } from '@profiler/store';
import { SharedModule } from '@shared/shared.module';
import {
  ProfileStatsComponent,
  ProfilesComparisonHistogramComponent,
} from './components';
import { ProfilerPageComponent, ProfilesComponent } from './containers';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('profiler', reducers),
    EffectsModule.forFeature([ProfilerEffects]),
  ],
  declarations: [
    ProfilerPageComponent,
    ProfilesComponent,
    ProfileStatsComponent,
    ProfilesComparisonHistogramComponent,
  ],
  providers: [ProfilerFacade],
  exports: [ProfilerPageComponent, ProfilesComponent],
})
export class ProfilerModule {}
