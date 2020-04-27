import { Component } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelVersion } from '@shared/models';
import { Observable } from 'rxjs';
import { MetricsComponent } from '@monitoring/containers/metrics/metrics.component';
import { ComparisonRegime, CustomMetricsFacade } from './custom-metrics.facade';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { ChartConfig } from '@monitoring/interfaces';

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
  chartConfigs$: Observable<ChartConfig[]>;
  constructor(
    private monitoringPageFacade: MonitoringPageFacade,
    private facade: CustomMetricsFacade,
    private dialog: DialogService
  ) {
    this.customMetricsChecks$ = this.facade.customMetrics$;
    this.comparisonRegime$ = this.facade.regime$;
    this.comparableModelVersions$ = this.facade.comparableModelVersions$;
    this.chartConfigs$ = this.facade.chartConfigs$;
  }

  comparableModelVersionsChanged(modelVersions: ModelVersion[]): void {
    this.facade.comparableModelVersionsChanged(modelVersions);
  }

  changeRegime(regime: ComparisonRegime): void {
    // TODO: check performance
    // this.facade.changeRegime(regime);
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
