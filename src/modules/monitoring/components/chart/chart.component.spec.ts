import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@shared/shared.module';
import { MockMetricSpecification } from '@testing/factories/metric-specification';
import { HsD3Module } from '../../../hs-d3/hs-d3.module';
import { ChartComponent } from './chart.component';

const MockMetricSettingService = {};

const MockMonitoringService = {
  getMetricsInRange() {},
};

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [HsD3Module, MdlSelectModule, SharedModule],
      providers: [
        { provide: MonitoringService, useValue: MockMonitoringService },
        provideMockStore(),
        { provide: MetricSettingsService, useValue: MockMetricSettingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.metrics = [MockMetricSpecification];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
