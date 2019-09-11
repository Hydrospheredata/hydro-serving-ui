import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { MonitoringServiceStatus } from '@monitoring/models';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { AlertMessageComponent } from '@shared/_index';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { SharedModule } from '@shared/shared.module';
import { BehaviorSubject } from 'rxjs';
import { MonitoringAvailabilityComponent } from './monitoring-availability.component';

describe('MonitoringAvailabilityComponent', () => {
  let component: MonitoringAvailabilityComponent;
  let fixture: ComponentFixture<MonitoringAvailabilityComponent>;
  let facade: {
    serviceStatusError$: BehaviorSubject<string>;
    serviceStatus$: BehaviorSubject<MonitoringServiceStatus>;
    getServiceStatus: () => {};
  };
  let getStatusSpy: jasmine.Spy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MonitoringAvailabilityComponent],
      providers: [
        {
          provide: MonitoringPageFacade,
          useValue: {
            serviceStatusError$: new BehaviorSubject(''),
            serviceStatus$: new BehaviorSubject(undefined),
            getServiceStatus: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringAvailabilityComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(MonitoringPageFacade);
    getStatusSpy = spyOn(facade, 'getServiceStatus');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('call getServiceStatus function', () => {
      expect(facade.getServiceStatus).toHaveBeenCalled();
      expect(facade.getServiceStatus).toHaveBeenCalledTimes(1);
    });

    it('show loading message', () => {
      const el: HTMLElement = fixture.nativeElement;
      const loader = el.querySelector('.loading');
      expect(loader).toBeTruthy();
    });
  });

  describe('if service status is AVAILABLE', () => {
    beforeEach(() => {
      facade.serviceStatus$.next(MonitoringServiceStatus.AVAILABLE);
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
      facade.serviceStatus$.next(MonitoringServiceStatus.FAILED);
      facade.serviceStatusError$.next(errorMessage);
      fixture.detectChanges();

      errorMessageComponent = fixture.debugElement.query(
        By.directive(ErrorMessageComponent)
      );
    });

    it('ErrorComponent is shown', () => {
      expect(errorMessageComponent).toBeTruthy();
    });

    it('ErrorComponent has error message', () => {
      expect(errorMessageComponent.nativeElement.textContent).toContain(
        errorMessage
      );
    });
  });

  describe('if service status is CLOSED FOR OSS', () => {
    let alertMessageComponent;

    beforeEach(() => {
      facade.serviceStatus$.next(MonitoringServiceStatus.CLOSED_FOR_OSS);
      fixture.detectChanges();

      alertMessageComponent = fixture.debugElement.query(
        By.directive(AlertMessageComponent)
      );
    });

    it('MonitoringComponent is shown', () => {
      expect(alertMessageComponent).toBeTruthy();
    });

    it('MonitoringComponent is shown', () => {
      const alertText =
        'Monitoring isn\'t available in OSS yet. But you can make request for a demo';
      expect(alertMessageComponent.nativeElement.textContent).toContain(
        alertText
      );
    });
  });
});
