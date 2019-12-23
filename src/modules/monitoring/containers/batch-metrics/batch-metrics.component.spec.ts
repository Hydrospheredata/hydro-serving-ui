import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMetricsComponent } from './batch-metrics.component';
import { SharedModule } from '@shared/shared.module';

describe('BatchMetricsComponent', () => {
  let component: BatchMetricsComponent;
  let fixture: ComponentFixture<BatchMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
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
