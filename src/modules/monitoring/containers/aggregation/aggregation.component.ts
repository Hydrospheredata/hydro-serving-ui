// import { AggregationFacade } from '@monitoring/containers/aggregation/aggregation.facade';
// import { Aggregation, AggregationsList } from '@monitoring/models';
// import { AggregationState } from '@monitoring/store/aggregation.state';
// import {
//   Component,
//   ChangeDetectionStrategy,
//   OnInit,
//   ViewChild,
//   ElementRef,
// } from '@node_modules/@angular/core';
// import { Observable } from '@node_modules/rxjs';
// import { tap } from '@node_modules/rxjs/operators';
//
// @Component({
//   selector: 'hs-aggregation',
//   templateUrl: './aggregation.component.html',
//   styleUrls: ['./aggregation.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   providers: [AggregationState, AggregationFacade],
// })
// export class AggregationComponent implements OnInit {
//   @ViewChild('svgContainer', { read: ElementRef })
//   svgContainer: ElementRef;
//
//   selectedAggregation$: Observable<Aggregation>;
//   aggregationList$: Observable<AggregationsList>;
//   canLoadLeft$: Observable<boolean>;
//   canLoadRight$: Observable<boolean>;
//
//   featureNames: string[] = [];
//   metricNames: string[] = [];
//   batchNames: string[] = [];
//
//   constructor(private readonly facade: AggregationFacade) {}
//
//   ngOnInit(): void {
//     this.aggregationList$ = this.facade.getAggregationList().pipe(
//       tap(aggregationList => {
//         this.featureNames = aggregationList.featureNames;
//         this.metricNames = aggregationList.metricNames;
//         this.batchNames = aggregationList.batchNames;
//       })
//     );
//
//     this.selectedAggregation$ = this.facade.getSelectedAggregation();
//     // this.canLoadLeft$ = this.facade.canLoadLeft();
//     // this.canLoadRight$ = this.facade.canLoadRight();
//     //
//   }
//
//   changeActiveColumn(aggregation: Aggregation) {
//     this.facade.selectAggregation(aggregation);
//   }
//
//   loadOlder() {
//     // this.facade.loadOlder();
//   }
//
//   loadNewest() {
//     // this.facade.loadNewest();
//   }
// }
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AggregationsList, Aggregation } from '@monitoring/models';
import { Observable } from '@node_modules/rxjs';
import { tap } from '@node_modules/rxjs/internal/operators';
import { AggregationFacade } from './aggregation.facade';

@Component({
  selector: 'hs-aggregation',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AggregationFacade],
})
export class AggregationComponent implements OnInit {
  aggregationList$: Observable<AggregationsList>;
  selectedAggregation$: Observable<Aggregation>;
  canLoadOlder$: Observable<boolean>;
  canLoadNewer$: Observable<boolean>;
  featureNames: string[] = [];
  metricNames: string[] = [];
  batchNames: string[] = [];
  constructor(private readonly facade: AggregationFacade) {}

  ngOnInit(): void {
    this.aggregationList$ = this.facade.getAggregationList().pipe(
      tap(aggregationList => {
        this.featureNames = aggregationList.featureNames;
        this.metricNames = aggregationList.metricNames;
        this.batchNames = aggregationList.batchNames;
      })
    );

    this.selectedAggregation$ = this.facade.getSelectedAggregation();

    this.canLoadOlder$ = this.facade.canLoadOlder();
    this.canLoadNewer$ = this.facade.canLoadNewer();
  }

  changeActiveColumn(aggregation: Aggregation) {
    this.facade.selectAggregation(aggregation);
  }

  loadOlder() {
    this.facade.loadOlder();
  }

  loadNewer() {
    this.facade.loadNewer();
  }
}
