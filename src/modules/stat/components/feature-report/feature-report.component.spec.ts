import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureReportComponent } from './feature-report.component';
import { SharedModule } from "@shared/shared.module";
import { ColorByDriftDirective } from "../../directives";
import { HistogramComponent } from "..";
import { mockStat } from "../../models";

describe('FeatureReportComponent', () => {
  let component: FeatureReportComponent;
  let fixture: ComponentFixture<FeatureReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeatureReportComponent,
        ColorByDriftDirective,
        HistogramComponent
      ],
      imports: [SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureReportComponent);
    component = fixture.componentInstance;
    component.perFeatureReport = mockStat.per_feature_report;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
