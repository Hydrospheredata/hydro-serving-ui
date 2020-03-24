import { Component } from '@angular/core';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';
import { CustomMetricsFacade, ComparisonRegime } from './custom-metrics.facade';

@Component({
  selector: 'hs-custom-metrics',
  templateUrl: './custom-metrics.component.html',
  styleUrls: ['./custom-metrics.component.scss'],
  providers: [CustomMetricsFacade],
})
export class CustomMetricsComponent {
  customMetricsChecks$: Observable<any>;
  comparisonRegime$: Observable<ComparisonRegime>;
  comparableModelVersions$: Observable<ModelVersion[]>;
  comparableCustomMetrics$: Observable<any>;
  chartConfigs: any;
  constructor(
    private facade: CustomMetricsFacade
  ) {
    this.customMetricsChecks$ = this.facade.customMetrics$;
    this.comparisonRegime$ = this.facade.regime$;
    this.comparableModelVersions$ = this.facade.comparableModelVersions$;
    this.comparableCustomMetrics$ = this.facade.comparableCustomMetricsByModelVersionId$;
    this.chartConfigs = this.facade.chartConfigs$;
  }

  comparableModelVersionsChanged(modelVersions: ModelVersion[]): void {
    this.facade.comparableModelVersionsChanged(modelVersions);
  }

  changeRegime(): void {
    this.facade.changeRegime();
  }
}
