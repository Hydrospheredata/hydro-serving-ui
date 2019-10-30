import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { StoreModule, combineReducers } from '@ngrx/store';
import { ProfilesComparisonHistogramComponent } from '@profiler/components';
import { ProfileStatsComponent } from '@profiler/components/profile-stats/profile-stats.component';
import * as fromProfiler from '@profiler/store';
import { ProfilerFacade } from '@profiler/store';
import { SharedModule } from '@shared/shared.module';
import { BehaviorSubject, of } from 'rxjs';
import { ProfilesComponent } from './profiles.component';

const c = combineReducers(fromProfiler.reducers);

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  let facade: Partial<ProfilerFacade>;

  const error = new BehaviorSubject(null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MdlModule,
        MdlSelectModule,
        StoreModule.forRoot({ profiler: c }),
      ],
      providers: [
        {
          provide: ProfilerFacade,
          useValue: {
            fields$: of([]),
            error$: error.asObservable(),
            cleanProfiles: () => {},
          },
        },
      ],
      declarations: [
        ProfilesComponent,
        ProfileStatsComponent,
        ProfilesComparisonHistogramComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(ProfilerFacade);
    spyOn(facade, 'cleanProfiles').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDestroy', () => {
    beforeEach(() => {
      fixture.destroy();
    });

    it('cleanProfiles function was called', () => {
      expect(facade.cleanProfiles).toHaveBeenCalled();
      expect(facade.cleanProfiles).toHaveBeenCalledTimes(1);
    });
  });
});
