import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FeatureReport, Stat } from '../../models';

@Component({
  selector: 'hs-feature-report',
  templateUrl: './feature-report.component.html',
  styleUrls: ['./feature-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureReportComponent implements OnInit {
  @Input() perFeatureReport: Stat['per_feature_report'];

  selectedFeatureReport: FeatureReport;

  ngOnInit() {
    if (this.perFeatureReport) {
      this.selectedFeatureReport = this.perFeatureReport[this.featureNames[0]];
    }
  }

  get featureNames(): string[] {
    return this.perFeatureReport ? Object.keys(this.perFeatureReport) : [];
  }
}
