import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HydroServingState } from '@core/store';
import { ModelsFacade } from '@models/store';
import { selectSelectedModelVersion } from '@models/store/selectors/model-versions.selectors';
import { MonitoringService } from '@monitoring/services';
import { CheckAggregationBuilder } from '@monitoring/services/builders/check-aggregation.builder';
import { MonitoringPageFacade } from '@monitoring/store/facades/monitoring-page.facade';
import { selectSelectedMetrics } from '@monitoring/store/selectors';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ModelVersion } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { of } from 'rxjs';

describe('Monitoring page facade', () => {
  let monitoringPageFacade: MonitoringPageFacade;
  let store: MockStore<HydroServingState>;
  let selectSelectedModelVersion$: MemoizedSelector<
    HydroServingState,
    ModelVersion
  >;
  let selectedMetrics$: MemoizedSelector<
    HydroServingState,
    MetricSpecification[]
  >;
  let monitoringService: MonitoringService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            models: {},
          },
        }),
        MonitoringPageFacade,
        { provide: ModelsFacade, useValue: {
          selectedModelVersion$: of(MockModelVersion1Model1),
        } },
        CheckAggregationBuilder,
        {
          provide: MonitoringService,
          useValue: {
            getChecksAggregation: () => of({count: 1, results: []}),
          },
        },
      ],
    });
  });

  beforeEach(() => {
    monitoringPageFacade = TestBed.get(MonitoringPageFacade);
    store = TestBed.get(Store);
    monitoringService = TestBed.get(MonitoringService);
    selectedMetrics$ = store.overrideSelector(selectSelectedMetrics, []);
    selectSelectedModelVersion$ = store.overrideSelector(
      selectSelectedModelVersion,
      MockModelVersion1Model1
    );
  });

  it('should be created', () => {
    expect(monitoringPageFacade).toBeTruthy();
  });

  describe('checkAggregationsResponse stream', () => {
    it('get new data at first frame and every 5 seconds', fakeAsync(() => {
      spyOn(monitoringService, 'getChecksAggregation').and.returnValue(
        of({count: 0, results: []})
      );
      const sub = monitoringPageFacade.checksAggregationResponse$.subscribe();

      tick(10000);

      expect(monitoringService.getChecksAggregation).toHaveBeenCalled();
      expect(monitoringService.getChecksAggregation).toHaveBeenCalledTimes(3);
      sub.unsubscribe();
    }));
    it('won\'t emit value, if got equal response', fakeAsync(() => {
      let count = 0;
      spyOn(monitoringService, 'getChecksAggregation').and.callThrough();
      const sub = monitoringPageFacade.checksAggregationResponse$.subscribe(res => {
        count = count + 1;
      });
      tick(20000);

      expect(count).toBe(1);
      sub.unsubscribe();
    }));
  });
});
