import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScatterPlotComponent} from './scatter-plot.component';
import {ScatterPlotLegendComponent} from "@testing/components";
import {SharedModule} from "@shared/shared.module";

describe('ScatterPlotComponent', () => {
  let component: ScatterPlotComponent;
  let fixture: ComponentFixture<ScatterPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScatterPlotComponent, ScatterPlotLegendComponent],
      imports: [SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
