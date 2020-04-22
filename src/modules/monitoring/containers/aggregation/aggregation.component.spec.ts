import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggregationComponent } from '@monitoring/containers/aggregation/aggregation.component';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { SharedModule } from '@shared/shared.module';
import { AggregationFacade } from '@monitoring/containers/aggregation/aggregation.facade';
import { of } from '@node_modules/rxjs';

const aggregationFacade: Partial<AggregationFacade> = {
  totalRequests$: of(0),
  showedRequests$: of(0),
  aggregation$: of(null),
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

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
