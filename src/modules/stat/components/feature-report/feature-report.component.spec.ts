import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureReportComponent } from './feature-report.component';

describe('FeatureReportComponent', () => {
  let component: FeatureReportComponent;
  let fixture: ComponentFixture<FeatureReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
