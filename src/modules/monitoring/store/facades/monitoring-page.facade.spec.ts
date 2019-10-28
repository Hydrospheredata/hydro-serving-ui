import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HydroServingState } from '@core/store';
import { ModelsFacade } from '@models/store';
import { selectSelectedModelVersion } from '@models/store/selectors/model-versions.selectors';
import { MonitoringService } from '@monitoring/services';
import { CheckAggregationBuilder } from '@monitoring/services/builders/check-aggregation.builder';
import { MonitoringPageFacade } from '@monitoring/store/facades/monitoring-page.facade';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ModelVersion } from '@shared/_index';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { asyncData } from '@testing/helpers';
import { of } from 'rxjs';
import { first, take } from 'rxjs/operators';

fdescribe('Monitoring page facade', () => {
  let monitoringPageFacade: MonitoringPageFacade;
  let store: MockStore<HydroServingState>;
  let selectSelectedModelVersion$: MemoizedSelector<
    HydroServingState,
    ModelVersion
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
        ModelsFacade,
        CheckAggregationBuilder,
        {
          provide: MonitoringService,
          useValue: {
            getChecksAggregation: () => of([{}]),
          },
        },
      ],
    });
  });

  beforeEach(() => {
    monitoringPageFacade = TestBed.get(MonitoringPageFacade);
    store = TestBed.get(Store);
    monitoringService = TestBed.get(MonitoringService);
    selectSelectedModelVersion$ = store.overrideSelector(
      selectSelectedModelVersion,
      MockModelVersion1Model1
    );
  });

  it('should be created', () => {
    expect(monitoringPageFacade).toBeTruthy();
  });

  describe('checkAggregations stream', () => {
    it('get new data at first frame and every 5 seconds', fakeAsync(() => {
      spyOn(monitoringService, 'getChecksAggregation').and.returnValue(of([{}]));
      const sub = monitoringPageFacade.checksAggreagtions$.subscribe();

      tick(10000);

      expect(monitoringService.getChecksAggregation).toHaveBeenCalled();
      expect(monitoringService.getChecksAggregation).toHaveBeenCalledTimes(3);
      sub.unsubscribe();
    }));
    it('won\'t emit value, if get equall response', fakeAsync(() => {
      let count = 0;
      spyOn(monitoringService, 'getChecksAggregation').and.callThrough();
      const sub = monitoringPageFacade.checksAggreagtions$.subscribe(res => {
        console.log(res);
        count = count + 1;
      });
      tick(20000);

      expect(count).toBe(1);
      sub.unsubscribe();
    }));
  });
});
