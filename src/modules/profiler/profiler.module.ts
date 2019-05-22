import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import {
  ProfilesComponent,
  ProfileStatsComponent,
  ProfilesComparisonHistogramComponent } from './components';
import { ProfilerPageComponent } from './containers/profiler-page/profiler-page.component';
import { ProfilerEffects, ProfilesEffects } from './effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MdlModule,
    MdlSelectModule,
    StoreModule.forFeature('profiler', reducers),
    EffectsModule.forFeature([ProfilerEffects, ProfilesEffects]),
  ],
  declarations: [
    ProfilerPageComponent,
    ProfilesComponent,
    ProfileStatsComponent,
    ProfilesComparisonHistogramComponent,
  ],
  exports: [
    ProfilerPageComponent,
  ],
})
export class ProfilerModule { }
