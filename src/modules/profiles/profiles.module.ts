import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfilesEffects } from '@profiles/effects';
import { reducers } from '@profiles/reducers';
import { ProfilerService } from '@profiles/services';
import { SharedModule } from '@shared/shared.module';
import {
  DataComparisonHistogramComponent
} from './components/data-comparison-histogram/data-comparison-histogram.component';
import { DataProfilesComponent } from './components/data-profiles/data-profiles.component';
import { DataStatsComponent } from './components/data-stats/data-stats.component';

const COMPONENTS = [
  DataProfilesComponent,
  DataStatsComponent,
  DataComparisonHistogramComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MdlModule,
    MdlSelectModule,
    StoreModule.forFeature('profiles', reducers),
    EffectsModule.forFeature([ProfilesEffects]),
  ],
  declarations: [...COMPONENTS],
  providers: [ProfilerService],
  exports: [...COMPONENTS],
})
export class ProfilesModule {}
