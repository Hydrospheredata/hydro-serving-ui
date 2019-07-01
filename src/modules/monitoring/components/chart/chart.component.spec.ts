import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import * as fromModels from '@models/reducers';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ModelVersion } from '@shared/_index';
import { SharedModule } from '@shared/shared.module';
import { MockMetricSpecification } from '@testing/factories/metric-specification';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { HsD3Module } from '../../../hs-d3/hs-d3.module';
import { ChartComponent } from './chart.component';

const MockMetricSettingService = {};

const MockMonitoringService = {
  getMetricsInRange() {},
};

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let store: MockStore<fromModels.State>;
  let modelVers: MemoizedSelector<fromModels.State, ModelVersion[]>;
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

    store = TestBed.get(Store);
    modelVers = store.overrideSelector(
      fromModels.getSiblingVersions,
      [MockModelVersion1Model1]
    );
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
