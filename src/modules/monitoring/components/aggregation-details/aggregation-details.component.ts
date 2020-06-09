import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AggregationDetailsService } from '@monitoring/components/aggregation-details/aggregation-details.service';
import { CheckCollection, Check, CheckId } from '@monitoring/models';
import { Observable, of } from '@node_modules/rxjs';
import { ModelVersion } from '@shared/models';

@Component({
  selector: 'hs-aggregation-details',
  templateUrl: './aggregation-details.component.html',
  styleUrls: ['./aggregation-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AggregationDetailsService],
})
export class AggregationDetailsComponent implements OnInit {
  @Output() showCheckDetails: EventEmitter<CheckId> = new EventEmitter<
    CheckId
  >();

  checks$: Observable<Check[]> = of([]);
  checkCollection$: Observable<CheckCollection>;
  modelVersion$: Observable<ModelVersion>;

  constructor(private facade: AggregationDetailsService) {}

  ngOnInit() {
    this.checks$ = this.facade.getVisibleChecks();
    this.checkCollection$ = this.facade.getCheckCollection();
    this.modelVersion$ = this.facade.getModelVersion();
  }

  onFilterChange(s) {
    this.facade.setFilter(s);
  }

  showDetails(check: Check) {
    this.showCheckDetails.next(check.id);
  }
}
