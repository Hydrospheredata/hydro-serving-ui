import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { MonitoringAvailabilityComponent } from '@monitoring/containers';
import { MonitoringServiceStatus } from '@monitoring/models';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { ServicesHeaderComponent } from '@shared/components/services-header/services-header.component';
import { SharedModule } from '@shared/shared.module';
import {
  AggregationComponent,
  RequestsInformationComponent,
  LogComponent,
  CustomChecksComponent,
  BatchMetricsComponent,
  CustomMetricsComponent,
} from '@testing/components';
import { MockZenModeServiceProvider } from '@testing/services/zenMode.service';
import { of } from 'rxjs';
import { MonitoringPageComponent } from './monitoring-page.component';
import { mockCheckCollection } from '@monitoring/mocks';

const modelsFacade = {};
const monitoringPageFacade: Partial<MonitoringPageFacade> = {
  loadMetrics(): void {
    console.log('load');
  },
  checks$: () => of(null),
  error$: () => of(null),
  selectedAggregation$: () => of(null),
  serviceStatus$: of(MonitoringServiceStatus.AVAILABLE),
  getServiceStatus() {},
};

describe('MonitoringPageComponent', () => {
  let component: MonitoringPageComponent;
  let fixture: ComponentFixture<MonitoringPageComponent>;
  let debugElement: DebugElement;
  let facade: Partial<MonitoringPageFacade>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonitoringPageComponent,
        AggregationComponent,
        RequestsInformationComponent,
        LogComponent,
        CustomChecksComponent,
        BatchMetricsComponent,
        CustomMetricsComponent,
        MonitoringAvailabilityComponent,
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        DialogService,
        {
          provide: MonitoringPageFacade,
          useValue: monitoringPageFacade,
        },
        { provide: ModelsFacade, useValue: modelsFacade },
        MockZenModeServiceProvider,
      ],
    })
      .overrideComponent(MonitoringPageComponent, {
        set: {
          providers: [
            {
              provide: MonitoringPageFacade,
              useValue: monitoringPageFacade,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringPageComponent);
    component = fixture.componentInstance;
    facade = fixture.componentRef.injector.get(MonitoringPageFacade);
    debugElement = fixture.debugElement;
    spyOn(facade, 'loadMetrics');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('called load metric', () => {
    fixture.detectChanges();
    expect(facade.loadMetrics).toHaveBeenCalled();
    expect(facade.loadMetrics).toHaveBeenCalledTimes(1);
  });

  it('contains service header', () => {
    fixture.detectChanges();
    const header = debugElement.query(By.directive(ServicesHeaderComponent));
    expect(header).toBeTruthy();
  });

  it('should SHOW aggregation', () => {
    fixture.detectChanges();
    const header = debugElement.query(By.directive(AggregationComponent));
    expect(header).toBeTruthy();
  });

  it('should SHOW CustomMetric component', () => {
    fixture.detectChanges();
    const header = debugElement.query(By.directive(CustomMetricsComponent));
    expect(header).toBeTruthy();
  });

  describe('WITHOUT selected aggregation', () => {
    it('should NOT SHOW request information component', () => {
      fixture.detectChanges();
      const header = debugElement.query(
        By.directive(RequestsInformationComponent)
      );
      expect(header).toBeNull();
    });
    it('should NOT SHOW Log component', () => {
      fixture.detectChanges();
      const header = debugElement.query(By.directive(LogComponent));
      expect(header).toBeNull();
    });
  });

  describe('WITH selected aggregation', () => {
    beforeEach(() => {
      spyOn(facade, 'checks$').and.returnValue(of(mockCheckCollection));
      fixture.detectChanges();
    });
    it('should SHOW request information component', () => {
      const header = debugElement.query(
        By.directive(RequestsInformationComponent)
      );
      expect(header).toBeTruthy();
    });
    it('should SHOW Log component', () => {
      const header = debugElement.query(By.directive(LogComponent));
      expect(header).toBeTruthy();
    });
  });

  describe('on error', () => {
    const errorText = 'Something went wrong';
    beforeEach(() => {
      spyOn(facade, 'error$').and.returnValue(of(errorText));
      fixture.detectChanges();
    });
    it('should SHOW error block', () => {
      const errorEl = debugElement.query(By.directive(ErrorMessageComponent));
      expect(errorEl).toBeTruthy();
    });

    it('should SHOW error text', () => {
      const errorEl = debugElement.query(By.directive(ErrorMessageComponent));
      expect(errorEl.nativeElement.innerText).toContain(errorText);
    });

    it('should NOT SHOW aggregation block', () => {
      const errorEl = debugElement.query(By.directive(AggregationComponent));
      expect(errorEl).toBeNull();
    });
  });
});
