import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationMetricsComponent } from './visualization-metrics.component';

describe('VisualizationMetricsComponent', () => {
  let component: VisualizationMetricsComponent;
  let fixture: ComponentFixture<VisualizationMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
