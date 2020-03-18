import { Component } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { AddComparableComponent } from '@monitoring/components';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';
import {
  ComparisonRegime,
  CustomMetricService,
} from './custom-metrics.service';

@Component({
  selector: 'hs-custom-metrics',
  templateUrl: './custom-metrics.component.html',
  styleUrls: ['./custom-metrics.component.scss'],
  providers: [CustomMetricService],
})
export class CustomMetricsComponent {
  customChecks$: Observable<any>;
  comparisonRegime$: Observable<ComparisonRegime>;
  comparableModelVersions$: Observable<ModelVersion[]>;
  comparableCustomMetrics$: Observable<any>;
  chartConfigs: any;
  constructor(
    private facade: MonitoringPageFacade,
    private dialog: DialogService,
    private customMetricService: CustomMetricService
  ) {
    this.customChecks$ = this.facade.customChecks$;
    this.comparisonRegime$ = this.customMetricService.comparisonRegime$;
    this.comparableModelVersions$ = this.customMetricService.comparableModelVersions$;
    this.comparableCustomMetrics$ = this.customMetricService.comparableCustomMetricsByModelVersionId$;
    this.chartConfigs = this.customMetricService.chartConfigs$;
  }

  changeRegime(regime: ComparisonRegime): void {
    this.customMetricService.changeRegime(regime);
  }

  addComparableModelVersion(id: number): void {
    this.dialog.createDialog({
      component: AddComparableComponent,
      providers: [
        { provide: CustomMetricService, useValue: this.customMetricService },
      ],
    });
  }

  removeComparableModelVersion(id: number): void {
    this.customMetricService.removeComparableModelVersion(id);
  }
}
