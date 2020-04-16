import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScatterPlotLegendComponent} from './scatter-plot-legend.component';
import {GradientLegendComponent} from "@testing/components";

describe('ScatterPlotLegendComponent', () => {
  let component: ScatterPlotLegendComponent;
  let fixture: ComponentFixture<ScatterPlotLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScatterPlotLegendComponent, GradientLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlotLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
