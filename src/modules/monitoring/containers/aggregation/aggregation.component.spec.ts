import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggregationComponent } from '@monitoring/containers/aggregation/aggregation.component';
import { AggregationFacade } from '@monitoring/containers/aggregation/aggregation.facade';
import { emptyAggregationList, aggregationList } from '@monitoring/mocks';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { detectChanges } from '@node_modules/@angular/core/src/render3';
import { By } from '@node_modules/@angular/platform-browser';
import { of } from '@node_modules/rxjs';
import { SharedModule } from '@shared/shared.module';

const aggregationFacade: Partial<AggregationFacade> = {
  aggregations$: () => of(emptyAggregationList),
};

describe('Aggregation component', () => {
  let fixture: ComponentFixture<AggregationComponent>;
  let component: AggregationComponent;
  let debugEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggregationComponent, CheckIdToTimePipe],
      imports: [SharedModule],
    })
      .overrideComponent(AggregationComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
          providers: [
            { provide: AggregationFacade, useValue: aggregationFacade },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when data is EMPTY', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should SHOW message', () => {
      const el = debugEl.query(By.css('.aggregation__message'));
      expect(el).toBeTruthy();
      expect(el.nativeElement.innerText).toContain(
        'No data available. Waiting data ...'
      );
    });

    it('should NOT SHOW header', () => {
      const el = debugEl.query(By.css('.aggregation__header'));
      expect(el).toBeNull();
    });
    it('should NOT SHOW body', () => {
      const el = debugEl.query(By.css('.aggregation__body'));
      expect(el).toBeNull();
    });
    it('should NOT SHOW labels', () => {
      const features = debugEl.query(By.css('.aggregation__features-label'));
      const metrics = debugEl.query(By.css('.aggregation__metrics-label'));
      expect(features).toBeNull();
      expect(metrics).toBeNull();
    });
  });

  describe('when data IS NOT EMPTY', () => {
    beforeEach(() => {
      spyOn(aggregationFacade, 'aggregations$').and.returnValue(
        of(aggregationList)
      );
      fixture.detectChanges();
    });

    it('should NOT SHOW message', () => {
      const el = debugEl.query(By.css('.aggregation__message'));
      expect(el).toBeNull();
    });
  });

  describe('on error', () => {});
});
