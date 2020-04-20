import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { ChecksAggregationItem } from '@monitoring/interfaces';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MonitoringPageFacade]
})
export class MonitoringPageComponent implements OnInit {
  checks$ = this.facade.checks$;
  customMetrics$ = this.facade.customMetrics$;
  errorsChecks$ = this.facade.errorsChecks$;
  latency$ = this.facade.latency$;
  modelVersion$ = this.facade.modelVersion$;
  selectedAggregationColumn$ = this.facade.selectedAggregation$;
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

  showBatchMetricsBlock(aggregationItem: ChecksAggregationItem): boolean {
    return aggregationItem && aggregationItem.batch !== undefined;
  }
}
