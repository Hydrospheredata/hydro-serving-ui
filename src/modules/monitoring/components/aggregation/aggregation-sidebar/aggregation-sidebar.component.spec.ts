import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationSidebarComponent } from './aggregation-sidebar.component';

describe('AggregationSidebarComponent', () => {
  let component: AggregationSidebarComponent;
  let fixture: ComponentFixture<AggregationSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
