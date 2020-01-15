import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMetricsTableComponent } from './log-metrics-table.component';

describe('LogMetricsTableComponent', () => {
  let component: LogMetricsTableComponent;
  let fixture: ComponentFixture<LogMetricsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogMetricsTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMetricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
