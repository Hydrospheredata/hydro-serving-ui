import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { SharedModule } from '@shared/shared.module';
import { MockMetricSpecification } from '@testing/factories/metric-specification';
import { HsD3Module } from '../../../hs-d3/hs-d3.module';
import { ChartComponent } from './chart.component';

const MockMonitoringService = {};

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [
        HsD3Module,
        MdlSelectModule,
        SharedModule,
      ],
      providers: [{provide: MonitoringService, useValue: MockMonitoringService}],
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
