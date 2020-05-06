import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { CheckCollection } from '@monitoring/models';
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
  customMetrics$ = this.facade.customMetrics$;
  modelVersion$ = this.facade.modelVersion$;
  selectedMetrics$ = this.facade.selectedMetrics$;
  siblingModelVersions$ = this.facade.siblingModelVersions$;
  error$: Observable<string | null>;
  checks$: Observable<CheckCollection>;
  selectedAggregation$: Observable<Aggregation | null>;

  detailedCheckLoading$: Observable<boolean> = this.facade.detailedLoading$;

  constructor(
    private dialogService: DialogService,
    private facade: MonitoringPageFacade
  ) {}

  ngOnInit(): void {
    this.error$ = this.facade.error$();
    this.selectedAggregation$ = this.facade.selectedAggregation$();
    this.checks$ = this.facade.checks$();
    this.facade.loadMetrics();
  }

  showBatchMetricsBlock(aggregation: Aggregation): boolean {
    return isEmptyObj(aggregation.batchesChecks) === false;
  }
}
