import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { AggregationFacade } from '@monitoring/containers/aggregation/aggregation.facade';
import {
  Aggregation,
  AggregationsList,
  AggregationCheck,
} from '@monitoring/models/Aggregation';
import { AggregationState } from '@monitoring/store/aggregation.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { interpolateRdYlGn } from 'd3';

@Component({
  selector: 'hs-aggregation',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AggregationState, AggregationFacade],
})
export class AggregationComponent implements OnInit {
  @ViewChild('svgContainer', { read: ElementRef })
  svgContainer: ElementRef;

  selectedAggregation$: Observable<Aggregation>;
  aggregations$: Observable<AggregationsList>;
  canLoadLeft$: Observable<boolean>;
  canLoadRight$: Observable<boolean>;

  labelsWidth: number = 100;
  canvasWidth: number = 880;

  featureNames: string[] = [];
  metricNames: string[] = [];
  batchNames: string[] = [];

  readonly CELL_SIZE = { width: 8, height: 14 };
  private readonly COLUMN_MARGIN_RIGHT = 1;
  private readonly CELL_MARGIN_TOP = 1;

  constructor(private readonly facade: AggregationFacade) {}

  ngOnInit(): void {
    this.aggregations$ = this.facade.getAggregations().pipe(
      tap(aggregationList => {
        this.featureNames = aggregationList.featureNames;
        this.metricNames = aggregationList.metricNames;
        this.batchNames = aggregationList.batchNames;
      })
    );

    this.selectedAggregation$ = this.facade.getSelectedAggregation();
    this.canLoadLeft$ = this.facade.canLoadLeft();
    this.canLoadRight$ = this.facade.canLoadRight();
    this.facade.loadAggregations();
  }

  get canvasHeight() {
    return (
      this.featureNames.length * (this.CELL_SIZE.height + this.CELL_MARGIN_TOP)
    );
  }

  get metricsCanvasHeight() {
    return (
      this.metricNames.length * (this.CELL_SIZE.height + this.CELL_MARGIN_TOP)
    );
  }

  get batchMetricsCanvasHeight() {
    return (
      this.batchNames.length * (this.CELL_SIZE.height + this.CELL_MARGIN_TOP)
    );
  }

  columnTranslate(index): string {
    return `translate(${
      index * this.CELL_SIZE.width + this.COLUMN_MARGIN_RIGHT * index
    }, 0)`;
  }

  rowTranslate(index): string {
    return `translate(0, ${
      index * this.CELL_SIZE.height + index * this.CELL_MARGIN_TOP
    })`;
  }

  changeActiveColumn(aggregation: Aggregation) {
    this.facade.selectAggregation(aggregation);
  }

  cellColor(aggregation: Aggregation, featureName: string) {
    const featureCheck = aggregation.featuresChecks[featureName];
    return this.getColor(featureCheck);
  }

  metricCellColor(aggregation: Aggregation, metricName: string) {
    const metricCheck = aggregation.metricsChecks[metricName];
    return this.getColor(metricCheck);
  }

  // batchMetricCellColor(aggregation: Aggregation, batchName: string) {
  //   const batchChecks = aggregation.batchesChecks;
  //   if (isEmptyObj(batchChecks)) {
  //     return 'lightgrey';
  //   }
  //
  //   let checked = 0;
  //   let passed = 0;
  //
  //   for (const featureName in batchChecks) {
  //     if (batchChecks.hasOwnProperty(featureName)) {
  //       const element = batchChecks[featureName];
  //
  //       if (element[batchName]) {
  //         checked = checked + element[batchName].checked;
  //         passed = passed + element[batchName].passed;
  //       } else {
  //         return 'lightgrey';
  //       }
  //     }
  //   }
  //
  //   if (checked === 0) {
  //     return 'lightgrey';
  //   } else {
  //     return checked === passed ? 'fill: rgb(0, 104, 55)' : 'rgb(165, 0, 38)';
  //   }
  // }

  loadOlder() {
    this.facade.loadOlder();
  }

  loadNewest() {
    this.facade.loadNewest();
  }

  private getColor(check: AggregationCheck): string {
    if (check === undefined) {
      return 'lightgrey';
    }
    const { passed, checked } = check;

    const ratio = checked / passed;

    if (ratio) {
      return interpolateRdYlGn(1 / ratio);
    } else {
      return 'lightgrey';
    }
  }
}
