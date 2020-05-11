import { Component, OnInit } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { MetricChartsState } from '@monitoring/store/metric-charts.state';
import { ModelVersion } from '@shared/models';
import { Observable } from 'rxjs';
import { MetricsComponent } from '@monitoring/containers/metrics/metrics.component';
import { ComparisonRegime, CustomMetricsFacade } from './custom-metrics.facade';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { ChartConfig } from '@monitoring/models';

@Component({
  selector: 'hs-custom-metrics',
  templateUrl: './custom-metrics.component.html',
  styleUrls: ['./custom-metrics.component.scss'],
  providers: [MetricChartsState, CustomMetricsFacade],
})
export class CustomMetricsComponent implements OnInit {
  customMetricsChecks$: Observable<any>;
  comparisonRegime$: Observable<ComparisonRegime>;
  comparableModelVersions$: Observable<ModelVersion[]>;
  chartConfigs$: Observable<ChartConfig[]>;

  constructor(
    private monitoringPageFacade: MonitoringPageFacade,
    private facade: CustomMetricsFacade,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.customMetricsChecks$ = this.facade.customMetrics$;
    this.comparableModelVersions$ = this.facade.getModelVersionsToCompare();
    this.chartConfigs$ = this.facade.getChartConfigs();
  }

  comparableModelVersionsChanged(modelVersions: ModelVersion[]): void {
    this.facade.comparableModelVersionsChanged(modelVersions);
  }

  openSettings() {
    this.dialog.createDialog({
      component: MetricsComponent,
      providers: [
        { provide: MonitoringPageFacade, useValue: this.monitoringPageFacade },
      ],
      styles: {
        width: '800px',
        height: '600px',
        padding: '0px',
      },
    });
  }

  trackByFn(_, chartConfig: ChartConfig) {
    return chartConfig.name;
  }
}
