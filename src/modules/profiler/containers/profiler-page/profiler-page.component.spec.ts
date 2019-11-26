import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { combineReducers } from '@ngrx/store';
import { ProfilerStatus } from '@profiler/models';
import * as fromProfiler from '@profiler/store';
import { AlertMessageComponent } from '@shared/_index';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { SharedModule } from '@shared/shared.module';
import { ProfilesComponent } from '@testing/components/mock-profiles';
import { getErrorText } from '@testing/helpers';
import { BehaviorSubject } from 'rxjs';
import { ProfilerFacade } from '../../store';
import { ProfilerPageComponent } from './profiler-page.component';

const c = combineReducers(fromProfiler.reducers);

describe('ProfilerPageComponent', () => {
  const serviceStatusStream = new BehaviorSubject(undefined);
  const errorStream = new BehaviorSubject(null);
  let component: ProfilerPageComponent;
  let fixture: ComponentFixture<ProfilerPageComponent>;
  let facade: Partial<ProfilerFacade>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ProfilesComponent, ProfilerPageComponent],
      providers: [
        {
          provide: ProfilerFacade,
          useValue: {
            serviceStatus$: serviceStatusStream.asObservable(),
            error$: errorStream.asObservable(),
            getProfilerServiceStatus: () => {},
          },
        },
      ],
    }).compileComponents();

    facade = TestBed.get(ProfilerFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilerPageComponent);
    component = fixture.componentInstance;
    spyOn(facade, 'getProfilerServiceStatus').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getServiceStatus function was called on init', () => {
    expect(facade.getProfilerServiceStatus).toHaveBeenCalled();
    expect(facade.getProfilerServiceStatus).toHaveBeenCalledTimes(1);
  });

  describe('if profiler service failed', () => {
    let errorDebugElement: DebugElement;
    const errorText = 'Error message';
    beforeEach(() => {
      serviceStatusStream.next(ProfilerStatus.FAILED);
      errorStream.next(errorText);
      fixture.detectChanges();
      errorDebugElement = fixture.debugElement.query(
        By.directive(ErrorMessageComponent)
      );
    });

    it('error template showed', () => {
      expect(errorDebugElement).toBeTruthy();
    });

    it('error template has right message', () => {
      expect(getErrorText(errorDebugElement)).toContain(errorText);
    });
  });

  describe('if profiler service closed for OSS', () => {
    let alertDebugElement: DebugElement;

    beforeEach(() => {
      serviceStatusStream.next(ProfilerStatus.CLOSED_FOR_OSS);
      fixture.detectChanges();
      alertDebugElement = fixture.debugElement.query(
        By.directive(AlertMessageComponent)
      );
    });

    it('alert template showed', () => {
      expect(alertDebugElement).toBeTruthy();
    });

    it('alert template has right message', () => {
      const message =
        'Profiler isn\'t available in OSS yet. But you can make request for a demo';
      expect(alertDebugElement.nativeElement.textContent).toContain(message);
    });
  });

  describe('if profiler service is available', () => {
    let alertDebugElement: DebugElement;
    let errorDebugElement: DebugElement;
    let profilesComponent: HTMLElement;

    beforeEach(() => {
      serviceStatusStream.next(ProfilerStatus.AVAILABLE);
      fixture.detectChanges();
      alertDebugElement = fixture.debugElement.query(
        By.directive(AlertMessageComponent)
      );
      errorDebugElement = fixture.debugElement.query(
        By.directive(ErrorMessageComponent)
      );
      profilesComponent = fixture.nativeElement.querySelector('.profiler');
    });

    it('error is not showed', () => {
      expect(errorDebugElement).toBeNull();
    });

    it('alert is not showed', () => {
      expect(alertDebugElement).toBeNull();
    });

    it('profiler component is showed', () => {
      expect(profilesComponent).toBeTruthy();
    });
  });
});
