import { Component, Input, OnInit } from '@angular/core';
import { FeatureReport, Stat } from "../../models";

@Component({
  selector: 'hs-feature-report',
  templateUrl: './feature-report.component.html',
  styleUrls: ['./feature-report.component.scss']
})
export class FeatureReportComponent implements OnInit {
  @Input() perFeatureReport: Stat["per_feature_report"];

  selectedFeatureReport: FeatureReport;
  constructor() { }

  ngOnInit() {
    this.selectedFeatureReport = this.perFeatureReport[this.featureNames[0]];
  }

  get featureNames(): string[] {
    return Object.keys(this.perFeatureReport);
  }
}
