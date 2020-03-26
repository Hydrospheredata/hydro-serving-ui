import { Component } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';
import { MetricsComponent } from '../metrics/metrics.component';
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
    private facade: CustomMetricsFacade,
    private dialog: DialogService
  ) {
    this.customMetricsChecks$ = this.facade.customMetrics$;
    this.comparisonRegime$ = this.facade.regime$;
    this.comparableModelVersions$ = this.facade.comparableModelVersions$;
    this.chartConfigs = this.facade.chartConfigs$;
  }

  comparableModelVersionsChanged(modelVersions: ModelVersion[]): void {
    this.facade.comparableModelVersionsChanged(modelVersions);
  }

  changeRegime(regime: ComparisonRegime): void {
    this.facade.changeRegime(regime);
  }

  openSettings() {
    this.dialog.createDialog({
      component: MetricsComponent,
      styles: {
        width: '800px',
        height: '600px',
        padding: '0px',
      },
    });
  }
}
