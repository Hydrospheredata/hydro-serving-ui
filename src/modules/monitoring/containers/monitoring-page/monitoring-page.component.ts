import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { MetricsComponent } from '@monitoring/containers/metrics/metrics.component';
import { MonitoringPageFacade } from '@monitoring/store/facades';
@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringPageComponent implements OnInit {
  checks$ = this.facade.checks$;
  checksAggregation$ = this.facade.checksAggregations$;
  customChecks$ = this.facade.customChecks$;
  customMetrics$ = this.facade.customMetrics$;
  errorsChecks$ = this.facade.errorsChecks$;
  latency$ = this.facade.latency$;
  modelVersion$ = this.facade.modelVersion$;
  selectedAggregationColumn$ = this.facade.selectedAggregation$;
  selectedMetrics$ = this.facade.selectedMetrics$;
  siblingModelVersions$ = this.facade.siblingModelVersions$;
  error$ = this.facade.error$;
  totalRequests$ = this.facade.requestsCount$;
  currentRequests$ = this.facade.receivedRequestCount$;
  canLoadRight$ = this.facade.canLoadRight$;
  canLoadLeft$ = this.facade.canLoadLeft$;

  constructor(
    private dialogService: DialogService,
    private facade: MonitoringPageFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadMetrics();
  }

  openSettings() {
    this.dialogService.createDialog({
      component: MetricsComponent,
      styles: {
        width: '800px',
        height: '600px',
        padding: '0px',
      },
    });
  }

  onSelectedAggregationColumn(id: string) {
    this.facade.selectAggregationColumn(id);
  }

  loadOlder() {
    this.facade.loadOlder();
  }
  loadNewest() {
    this.facade.loadNewest();
  }
}
