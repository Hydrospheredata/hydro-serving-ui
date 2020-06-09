import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationDetailsComponent } from './aggregation-details.component';

describe('AggregationDetailsComponent', () => {
  let component: AggregationDetailsComponent;
  let fixture: ComponentFixture<AggregationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
