import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, ProfilerEffects, ProfilesEffects, ProfilerFacade } from '@profiler/store';
import { SharedModule } from '@shared/shared.module';
import {
  ProfilesComponent,
  ProfileStatsComponent,
  ProfilesComparisonHistogramComponent,
} from './components';
import { ProfilerPageComponent } from './containers/profiler-page/profiler-page.component';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('profiler', reducers),
    EffectsModule.forFeature([ProfilerEffects, ProfilesEffects]),
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
