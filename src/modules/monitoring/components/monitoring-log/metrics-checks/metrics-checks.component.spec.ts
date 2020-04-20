import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsChecksComponent } from '@monitoring/components';

describe('LogMetricsTableComponent', () => {
  let component: MetricsChecksComponent;
  let fixture: ComponentFixture<MetricsChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetricsChecksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
