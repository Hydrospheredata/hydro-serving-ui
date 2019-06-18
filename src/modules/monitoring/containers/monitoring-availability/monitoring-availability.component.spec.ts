import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import * as actions from '@monitoring/actions';
import {
  SetStatusToAvailableAction,
  SetStatusToFailedAction,
  SetStatusToClosedForOSSAction
} from '@monitoring/actions';
import * as fromMonitoring from '@monitoring/reducers';
import * as fromMonitoringServiceStatus from '@monitoring/reducers/monitoring-service-status.reducer';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { AlertMessageComponent } from '@shared/_index';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { SharedModule } from '@shared/shared.module';
import { MonitoringAvailabilityComponent } from './monitoring-availability.component';

interface MockState {
  'monitoring': fromMonitoring.State;
}

describe('MonitoringAvailabilityComponent', () => {
  let component: MonitoringAvailabilityComponent;
  let fixture: ComponentFixture<MonitoringAvailabilityComponent>;
  let store: Store<MockState>;

  const reducers = combineReducers({
    monitoringServiceStatus: fromMonitoringServiceStatus.reducer,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({monitoring: reducers}),
      ],
      declarations: [ MonitoringAvailabilityComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringAvailabilityComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('dispatch getMonitoringServiceStatus action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new actions.GetServiceStatusAction());
    });

    it('show loading message', () => {
      const el: HTMLElement = fixture.nativeElement;
      const loader = el.querySelector('.loading');
      expect(loader).toBeTruthy();
    });
  });

  describe('if service status is AVAILABLE', () => {
    beforeEach(() => {
      store.dispatch(new SetStatusToAvailableAction());
      fixture.detectChanges();
    });

    it('MonitoringComponent is shown', () => {
      const el: HTMLElement = fixture.nativeElement;
      const monitoringComponent = el.querySelector('.monitoring');

      expect(monitoringComponent).toBeTruthy();
    });
  });

  describe('if service status is UNAVAILABLE', () => {
    let errorMessageComponent;
    const errorMessage = 'Fail';

    beforeEach(() => {
      store.dispatch(new SetStatusToFailedAction({errorMessage}));
      fixture.detectChanges();

      errorMessageComponent = fixture.debugElement.query(By.directive(ErrorMessageComponent));

    });

    it('ErrorComponent is shown', () => {
      expect(errorMessageComponent).toBeTruthy();
    });

    it('ErrorComponent has error message', () => {
      expect(errorMessageComponent.nativeElement.textContent).toContain(errorMessage);
    });
  });

  describe('if service status is CLOSED FOR OSS', () => {
    let alertMessageComponent;

    beforeEach(() => {
      store.dispatch(new SetStatusToClosedForOSSAction());
      fixture.detectChanges();

      alertMessageComponent = fixture.debugElement.query(By.directive(AlertMessageComponent));
    });

    it('MonitoringComponent is shown', () => {
      expect(alertMessageComponent).toBeTruthy();
    });

    it('MonitoringComponent is shown', () => {
      const alertText = 'Monitoring isn\'t available in OSS yet. But you can make request for a demo';
      expect(alertMessageComponent.nativeElement.textContent).toContain(alertText);
    });
  });
});
