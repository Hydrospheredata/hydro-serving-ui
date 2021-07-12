import { Component, OnInit } from '@angular/core';
import { DialogMetricsComponent } from '@app/modules/dialogs/components';
import { Observable } from 'rxjs';

import { ModelVersion } from '@app/core/data/types';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';

import { MetricChartsState } from '../../store/metric-charts.state';

import { ChartConfig } from '../../models';
import { CustomMetricsFacade } from '@app/modules/monitoring/containers/custom-metrics/custom-metrics.facade';

@Component({
  selector: 'hs-custom-metrics-v2',
  templateUrl: './custom-metrics_v2.component.html',
  styleUrls: ['./custom-metrics_v2.component.scss'],
  providers: [MetricChartsState, CustomMetricsFacade],
})
export class CustomMetricsComponentV2 implements OnInit {
  customMetricsChecks$: Observable<any>;
  comparableModelVersions$: Observable<ModelVersion[]>;
  chartConfigs$: Observable<ChartConfig[]>;

  constructor(
    private facade: CustomMetricsFacade,
    private dialog: DialogsService,
  ) {}

  ngOnInit() {
    this.customMetricsChecks$ = this.facade.getCustomMetrics();
    this.comparableModelVersions$ = this.facade.getModelVersionsToCompare();
    this.chartConfigs$ = this.facade.getChartConfigs();
  }

  comparableModelVersionsChanged(modelVersions: ModelVersion[]): void {
    this.facade.comparableModelVersionsChanged(modelVersions);
  }

  openSettings(): void {
    this.dialog.createDialog({
      component: DialogMetricsComponent,
      styles: {
        width: '800px',
        height: '600px',
        padding: '0px',
      },
    });
  }

  trackByFn(_, chartConfig: ChartConfig): string {
    return chartConfig.name;
  }
}
