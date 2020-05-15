import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { CheckCollection } from '@monitoring/models';
import { Aggregation } from '@monitoring/models/Aggregation';
import { MonitoringPageState } from '@monitoring/store/monitoring-page-state.service';
import { ModelVersion } from '@shared/models';
import { neitherNullNorUndefined } from '@shared/utils';
import { MonitoringPageFacade } from './monitoring-page.facade';
import { isEmptyObj } from '@shared/utils/is-empty-object';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MonitoringPageState, MonitoringPageFacade],
})
export class MonitoringPageComponent implements OnInit {
  modelVersion$: Observable<ModelVersion>;
  error$: Observable<string | null>;
  checks$: Observable<CheckCollection>;
  selectedAggregation$: Observable<Aggregation | null>;

  detailedCheckLoading$: Observable<boolean> = this.facade.detailedLoading$;

  constructor(
    private dialogService: DialogService,
    private facade: MonitoringPageFacade
  ) {}

  ngOnInit(): void {
    this.modelVersion$ = this.facade.getModelVersion();
    this.error$ = this.facade.getError();
    this.selectedAggregation$ = this.facade
      .getAggregation()
      .pipe(neitherNullNorUndefined);
    this.checks$ = this.facade.getChecks();

    this.facade.loadMetrics();
    this.facade.loadChecks();
  }

  showBatchMetricsBlock(aggregation: Aggregation): boolean {
    return isEmptyObj(aggregation.batchesChecks) === false;
  }
}
