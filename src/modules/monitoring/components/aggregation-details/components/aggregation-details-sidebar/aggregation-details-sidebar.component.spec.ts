import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationDetailsSidebarComponent } from './aggregation-details-sidebar.component';

describe('AggregationDetailsSidebarComponent', () => {
  let component: AggregationDetailsSidebarComponent;
  let fixture: ComponentFixture<AggregationDetailsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationDetailsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationDetailsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
