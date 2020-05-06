import { AggregationFacade } from '@monitoring/containers/aggregation/aggregation.facade';
import { fakeAsync, tick } from '@node_modules/@angular/core/testing';
import { hot, getTestScheduler, cold } from '@node_modules/jasmine-marbles';
import { of } from '@node_modules/rxjs';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import createSpyObj = jasmine.createSpyObj;

const monitoringPageFacade = {
  modelVersion$: of(MockModelVersion1Model1),
  selectedMetrics$: of([]),
  selectedAggregation: () => {},
} as any;

const monitoringServiceSpy = createSpyObj('MoitoringService', [
  'getChecksAggregation',
]);

describe('AggregationFacade', () => {
  let facade: AggregationFacade;

  beforeEach(() => {
    facade = new AggregationFacade(
      monitoringPageFacade,
      monitoringServiceSpy,
      null
    );
  });

  it('test', () => {
    expect(1).toBeTruthy();
  });

  describe('checksAggregationResponse$', () => {
    it('first tick set loading to TRUE', fakeAsync(() => {
      monitoringServiceSpy.getChecksAggregation.and.returnValue(
        hot('---x|', { x: [] })
      );
      let loader = false;

      facade.loading$.subscribe(v => {
        loader = v;
      });
      const subscribe = facade.checksAggregationResponse$.subscribe();

      tick(0);

      expect(loader).toBe(true);
      subscribe.unsubscribe();
    }));

    it('set loader to FALSE when got data', fakeAsync(() => {
      monitoringServiceSpy.getChecksAggregation.and.returnValue(
        hot('---x|', { x: [] })
      );
      let loader = false;
      const s1 = facade.loading$.subscribe(v => {
        loader = v;
      });
      const s2 = facade.checksAggregationResponse$.subscribe();

      getTestScheduler().flush();

      expect(loader).toBe(false);

      s1.unsubscribe();
      s2.unsubscribe();
    }));

    it('set loader to FALSE when got Error', fakeAsync(() => {
      monitoringServiceSpy.getChecksAggregation.and.returnValue(
        hot('---#|', null, new Error('something goes wrong'))
      );
      let loader = false;
      const s1 = facade.loading$.subscribe(v => {
        loader = v;
      });
      const s2 = facade.checksAggregationResponse$.subscribe();

      getTestScheduler().flush();

      expect(loader).toBe(false);

      s1.unsubscribe();
      s2.unsubscribe();
    }));

    it('DOES NOT emit deep equal response ', fakeAsync(() => {
      monitoringServiceSpy.getChecksAggregation.and.returnValue(
        cold('x|', { x: [] })
      );
      let count = 0;
      const s1 = facade.checksAggregationResponse$.subscribe(() => {
        count = count + 1;
      });
      tick(0);
      getTestScheduler().flush();
      tick(5000);
      getTestScheduler().flush();

      expect(count).toBe(1);

      s1.unsubscribe();
    }));
  });
});
