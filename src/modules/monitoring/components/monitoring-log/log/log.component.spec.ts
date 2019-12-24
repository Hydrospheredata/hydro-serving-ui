import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { SharedModule } from '@shared/shared.module';
import { LogDetailComponent } from '@testing/components';
import { getNativeElement } from '@testing/helpers';
import { LogComponent } from './log.component';

describe('Log component', () => {
  let fixture: ComponentFixture<LogComponent>;
  let component: LogComponent;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogComponent, LogDetailComponent, CheckIdToTimePipe],
      imports: [SharedModule],
    })
      .overrideComponent(LogComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when no data available', () => {
    beforeEach(() => {
      component.checks = [];
      fixture.detectChanges();
    });

    it('shows message', () => {
      const messageDebugEl = debugElement.query(By.css('.log__message'));

      expect(messageDebugEl).toBeTruthy();
      expect(getNativeElement(messageDebugEl).textContent).toContain(
        'No data available'
      );
    });
    it('doesn\'t show body section', () => {
      const messageDebugEl = debugElement.query(By.css('.log__body'));

      expect(messageDebugEl).toBeFalsy();
    });
  });
  describe('when have data available', () => {
    beforeEach(() => {
      component.checks = [
        {
          _id: 'id',
          _hs_error: 1,
          _hs_latency: 1,
          _hs_model_version_id: 2,
          _hs_overall_score: 0,
          _hs_prediction_score: 0,
          _hs_raw_checks: { overall: [] },
          _hs_metric_checks: {},
          _hs_score: 0,
        },
      ];
      fixture.detectChanges();
    });

    it('shows body section', () => {
      const messageDebugEl = debugElement.query(By.css('.log__body'));

      expect(messageDebugEl).toBeTruthy();
    });

    it('shows message', () => {
      const messageDebugEl = debugElement.query(By.css('.log__message'));

      expect(messageDebugEl).toBeFalsy();
    });
  });

  describe('loader', () => {
    it('wasn\'t shown', () => {
      const de = fixture.debugElement.query(By.css('.log__loader'));
      expect(de).toBeNull();
    });
    it('was shown when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const de = fixture.debugElement.query(By.css('.log__loader'));
      expect(de).toBeTruthy();
    });
  });
});
