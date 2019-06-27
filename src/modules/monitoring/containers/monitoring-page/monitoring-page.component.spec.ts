import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { getSelectedMetrics } from '@core/reducers';
import * as fromModels from '@models/reducers';
import { MemoizedSelector, Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ModelVersion, AlertMessageComponent } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { SharedModule } from '@shared/shared.module';
import {
  HealthTimelineComponent,
  ReqResLogsComponent,
} from '@testing/components';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { MonitoringPageComponent } from './monitoring-page.component';

const metricSpec: MetricSpecification = {
  id: 'id',
  name: 'testMetric',
  kind: 'CounterMetricSpec',
  modelVersionId: 1,
  config: {},
  withHealth: true,
};

fdescribe('MonitoringPageComponent', () => {
  let component: MonitoringPageComponent;
  let fixture: ComponentFixture<MonitoringPageComponent>;
  let store: MockStore<fromModels.State>;
  let selectedModelVersion: MemoizedSelector<fromModels.State, ModelVersion>;
  let selectedMetricSpecs: MemoizedSelector<{}, MetricSpecification[]>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonitoringPageComponent,
        HealthTimelineComponent,
        ReqResLogsComponent,
      ],
      imports: [RouterTestingModule, SharedModule],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.get(Store);
    selectedModelVersion = store.overrideSelector(
      fromModels.getSelectedModelVersion,
      MockModelVersion1Model1
    );
    selectedMetricSpecs = store.overrideSelector(getSelectedMetrics, []);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    console.log(component.selectedMetricSpecifications$);
    expect(component).toBeTruthy();
  });

  describe('with empty metrics array', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('shows alert message', () => {
      const alertEl = fixture.debugElement.query(
        By.directive(AlertMessageComponent)
      );
      expect(alertEl).toBeTruthy();
    });
  });

  describe('with metrics', () => {
    beforeEach(() => {
      selectedMetricSpecs = store.overrideSelector(getSelectedMetrics, [
        metricSpec,
      ]);
      fixture.detectChanges();
    });
    it('shows HealthTimelineComponent', () => {
      component.selectedMetricSpecifications$.subscribe(console.dir);
      const alertEl = fixture.debugElement.query(
        By.directive(HealthTimelineComponent)
      );
      expect(alertEl).toBeTruthy();
    });
  });
});
