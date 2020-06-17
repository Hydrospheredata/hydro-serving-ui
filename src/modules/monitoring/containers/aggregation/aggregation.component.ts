import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AggregationsList, Aggregation } from '@monitoring/models';
import { Observable } from '@node_modules/rxjs';
import { tap } from '@node_modules/rxjs/internal/operators';
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
}
