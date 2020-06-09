import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationLegendComponent } from './aggregation-legend.component';

describe('AggregationLegendComponent', () => {
  let component: AggregationLegendComponent;
  let fixture: ComponentFixture<AggregationLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
