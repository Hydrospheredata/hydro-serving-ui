import { DataStatsComponent } from './components/data-stats/data-stats.component';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { DataProfilesComponent } from './components/data-profiles/data-profiles.component';
import { ProfilesEffects } from '@profiles/effects';
import { EffectsModule } from '@ngrx/effects';
import { ProfilerService } from '@profiles/services';
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { StoreModule } from '@ngrx/store';
import { reducers } from '@profiles/reducers';
import { MdlSelectModule } from '@angular-mdl/select';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MdlModule,
    MdlSelectModule,
    StoreModule.forFeature('profiles', reducers),
    EffectsModule.forFeature([ProfilesEffects]),
  ],
  declarations: [DataProfilesComponent, DataStatsComponent],
  providers: [ProfilerService],
  exports: [DataProfilesComponent, DataStatsComponent]
})
export class ProfilesModule {}
