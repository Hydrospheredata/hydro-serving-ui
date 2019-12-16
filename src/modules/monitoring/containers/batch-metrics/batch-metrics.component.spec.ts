import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMetricsComponent } from './batch-metrics.component';

describe('BatchMetricsComponent', () => {
  let component: BatchMetricsComponent;
  let fixture: ComponentFixture<BatchMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
