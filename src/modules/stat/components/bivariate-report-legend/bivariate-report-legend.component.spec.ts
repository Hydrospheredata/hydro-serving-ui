import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BivariateReportLegendComponent } from './bivariate-report-legend.component';

describe('BivariateReportLegendComponent', () => {
  let component: BivariateReportLegendComponent;
  let fixture: ComponentFixture<BivariateReportLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BivariateReportLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BivariateReportLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
