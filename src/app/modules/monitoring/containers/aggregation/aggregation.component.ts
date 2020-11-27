import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AggregationsList, Aggregation } from '../../models';

import { AggregationService } from './aggregation.service';

@Component({
  selector: 'hs-aggregation',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AggregationService],
})
export class AggregationComponent implements OnInit {
  aggregationList$: Observable<AggregationsList>;
  selectedAggregation$: Observable<Aggregation>;
  canLoadOlder$: Observable<boolean>;
  canLoadNewer$: Observable<boolean>;
  minDate$: Observable<Date>;
  maxDate$: Observable<Date>;
  filterDateRange$: Observable<{ from: Date; to: Date }>;

  inputNames: string[] = [];
  outputNames: string[] = [];
  metricNames: string[] = [];

  constructor(private readonly aggregationService: AggregationService) {}

  ngOnInit(): void {
    this.aggregationList$ = this.aggregationService.getAggregationList().pipe(
      tap(agg => {
        this.inputNames = agg ? agg.inputNames : undefined;
        this.outputNames = agg ? agg.outputNames : undefined;
        this.metricNames = agg ? agg.metricNames : undefined;
      })
    );

    this.selectedAggregation$ = this.aggregationService.getSelectedAggregation();

    this.canLoadOlder$ = this.aggregationService.canLoadOlder();
    this.canLoadNewer$ = this.aggregationService.canLoadNewer();
    this.minDate$ = this.aggregationService.getMinDate();
    this.maxDate$ = this.aggregationService.getMaxDate();
    this.filterDateRange$ = this.aggregationService.getFilterDateRange();
  }

  changeActiveColumn(aggregation: Aggregation) {
    this.aggregationService.selectAggregation(aggregation);
  }

  loadOlder() {
    this.aggregationService.loadOlder();
  }

  loadNewer() {
    this.aggregationService.loadNewer();
  }

  handleDateTimeRangeChange(range: { from: Date; to: Date }): void {
    this.aggregationService.changeDateTimeRange(range);
  }

  handleFilterDateReset(): void {
    this.aggregationService.clearDateTimeFilter();
  }
}
