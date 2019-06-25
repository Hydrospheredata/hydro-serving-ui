import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { StoreModule, combineReducers } from '@ngrx/store';
import { ProfileStatsComponent } from '@profiler/components/profile-stats/profile-stats.component';
import {
  ProfilesComparisonHistogramComponent
} from '@profiler/components/profiles-comparison-histogram/profiles-comparison-histogram.component';
import * as fromProfiler from '@profiler/reducers';
import { SharedModule } from '@shared/shared.module';
import { ProfilesComponent } from './profiles.component';

const c = combineReducers(fromProfiler.reducers);

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MdlModule,
        MdlSelectModule,
        StoreModule.forRoot({profiler: c}),
      ],
      declarations: [
        ProfilesComponent,
        ProfileStatsComponent,
        ProfilesComparisonHistogramComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
