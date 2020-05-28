import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CheckCollection, AggregationsList } from '@monitoring/models';
import { Aggregation } from '@monitoring/models/Aggregation';
import { MonitoringPageState } from '@monitoring/store/monitoring-page-state.service';
import { ModelVersion } from '@shared/models';
import { MonitoringPageService } from './monitoring-page.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MonitoringPageState, MonitoringPageService],
})
export class MonitoringPageComponent implements OnInit {
  aggregationList$: Observable<AggregationsList>;
  modelVersion$: Observable<ModelVersion>;
  checks$: Observable<CheckCollection>;
  selectedAggregation$: Observable<Aggregation>;

  constructor(private monitoringPageService: MonitoringPageService) {}

  ngOnInit(): void {
    this.modelVersion$ = this.monitoringPageService.getModelVersion();
    this.selectedAggregation$ = this.monitoringPageService.getSelectedAggregation();
    this.aggregationList$ = this.monitoringPageService.getAggregationList();
    this.checks$ = this.monitoringPageService.getChecks();

    this.monitoringPageService.loadMetrics();
    this.monitoringPageService.loadAggregations();
    this.monitoringPageService.loadChecks();
  }
}
