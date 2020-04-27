import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { Aggregation } from '@monitoring/models/Aggregation';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { isEmptyObj } from '@shared/utils/is-empty-object';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MonitoringPageFacade],
})
export class MonitoringPageComponent implements OnInit {
  checks$ = this.facade.checks$;
  customMetrics$ = this.facade.customMetrics$;
  errorsChecks$ = this.facade.errorsChecks$;
  latency$ = this.facade.latency$;
  modelVersion$ = this.facade.modelVersion$;
  selectedAggregation$ = this.facade.selectedAggregation$;
  selectedMetrics$ = this.facade.selectedMetrics$;
  siblingModelVersions$ = this.facade.siblingModelVersions$;
  error$ = this.facade.error$;

  detailedCheckLoading$: Observable<boolean> = this.facade.detailedLoading$;

  constructor(
    private dialogService: DialogService,
    private mF: ModelsFacade,
    private facade: MonitoringPageFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadMetrics();
  }

  showBatchMetricsBlock(aggregation: Aggregation): boolean {
    return isEmptyObj(aggregation.batchesChecks) === false;
  }
}
