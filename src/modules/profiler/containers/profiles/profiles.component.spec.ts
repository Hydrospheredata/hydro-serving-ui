import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfilesComparisonHistogramComponent } from '@profiler/components';
import { ProfileStatsComponent } from '@profiler/components/profile-stats/profile-stats.component';
import { ProfilerFacade } from '@profiler/store';
import { SharedModule } from '@shared/shared.module';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { ProfilesComponent } from './profiles.component';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  let facade: Partial<ProfilerFacade>;

  const error = new BehaviorSubject(null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ProfilerFacade,
          useValue: {
            fields$: of([]),
            error$: error.asObservable(),
            cleanProfiles: () => {},
            selectedField: new Subject(),
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
