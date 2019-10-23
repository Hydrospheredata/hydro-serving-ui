import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AggregationComponent } from '@monitoring/containers/aggregation/aggregation.component';
import {
  ChecksAggregation,
} from '@monitoring/interfaces';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { SharedModule } from '@shared/shared.module';
import { getNativeElement } from '@testing/helpers';

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
        set: { changeDetection: ChangeDetectionStrategy.Default },
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

  describe('if aggregation list is empty', () => {
    it('shows message', () => {
      const message = debugEl.query(By.css('.aggregation__message'));

      expect(message).toBeTruthy();
      expect(getNativeElement(message).textContent).toContain(
        'No data available. Waiting data ...'
      );
    });
  });

  describe('with some data', () => {
    beforeEach(() => {
      const mockAggregation: ChecksAggregation = {
        features: {
          fake_check: {
            passed: 0,
            checks: 1,
          },
        },
        additionalInfo: {
          _hs_first_id: '1',
          _hs_last_id: '2',
          _hs_model_version_id: 1,
          _hs_requests: 10,
          _id: '1',
        },
      };

      component.aggregation = [mockAggregation];

      fixture.detectChanges();
    });
    it('alert message hidden', () => {
      const message = debugEl.query(By.css('.aggregation__message'));
      expect(message).toBeFalsy();
    });
  });
});
