import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { ProfilerPageComponent } from './pages';
import { ProfilerRoutingModule } from './profiler-routing.module';
import { ProfileDetailsComponent } from './containers';
import {
  ProfileStatsComponent,
  ProfilesComparisonHistogramComponent,
} from './components';

@NgModule({
  imports: [SharedModule, ProfilerRoutingModule],
  declarations: [
    ProfilerPageComponent,
    ProfileDetailsComponent,
    ProfileStatsComponent,
    ProfilesComparisonHistogramComponent,
  ],
  providers: [],
  exports: [],
})
export class ProfilerModule {}
