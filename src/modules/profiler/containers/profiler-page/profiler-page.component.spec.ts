import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import * as fromProfiler from '@profiler/reducers';
import { AlertMessageComponent } from '@shared/_index';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { SharedModule } from '@shared/shared.module';
import { ProfilesComponent } from '@testing/components/mock-profiles';
import {
  ProfilerServiceStatusIsFailed,
  ProfilerServiceStatusIsClosedForOSS,
  ProfilerServiceStatusIsAvailable
} from '../../actions';
import { ProfilerPageComponent } from './profiler-page.component';

const c = combineReducers(fromProfiler.reducers);

describe('ProfilerPageComponent', () => {
  let component: ProfilerPageComponent;
  let fixture: ComponentFixture<ProfilerPageComponent>;
  let store: MockStore<fromProfiler.ProfilerState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({profiler: c}),
      ],
      declarations: [ ProfilesComponent, ProfilerPageComponent,  ],
      providers: [],
    })
    .compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('if profiler service failed', () => {
    let errorDebugElement: DebugElement;

    beforeEach(() => {
      store.dispatch(new ProfilerServiceStatusIsFailed({errorMessage: 'Fail'}));
      fixture.detectChanges();
      errorDebugElement = fixture.debugElement.query(By.directive(ErrorMessageComponent));
    });

    it('error template showed', () => {
      expect(errorDebugElement).toBeTruthy();
    });

    it('error template has right message', () => {
      expect(errorDebugElement.nativeElement.textContent).toContain('Fail');
    });
  });

  describe('if profiler service closed for OSS', () => {
    let alertDebugElement: DebugElement;

    beforeEach(() => {
      store.dispatch(new ProfilerServiceStatusIsClosedForOSS());
      fixture.detectChanges();
      alertDebugElement = fixture.debugElement.query(By.directive(AlertMessageComponent));
    });

    it('alert template showed', () => {
      expect(alertDebugElement).toBeTruthy();
    });

    it('alert template has right message', () => {
      const message = 'Profiler isn\'t available in OSS yet. But you can make request for a demo';
      expect(alertDebugElement.nativeElement.textContent).toContain(message);
    });
  });

  describe('if profiler service is available', () => {
    let alertDebugElement: DebugElement;
    let errorDebugElement: DebugElement;
    let profilesComponent: HTMLElement;

    beforeEach(() => {
      store.dispatch(new ProfilerServiceStatusIsAvailable());
      fixture.detectChanges();
      alertDebugElement = fixture.debugElement.query(By.directive(AlertMessageComponent));
      errorDebugElement = fixture.debugElement.query(By.directive(ErrorMessageComponent));
      profilesComponent = fixture.nativeElement.querySelector('.profiler');
    });

    it('error did not show', () => {
      expect(errorDebugElement).toBeNull();
    });

    it('alert did not show', () => {
      expect(alertDebugElement).toBeNull();
    });

    it('profiler component showed', () => {
      expect(profilesComponent).toBeTruthy();
    });
  });
});
