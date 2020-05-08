import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { AggregationFacade } from '@monitoring/containers/aggregation/aggregation.facade';
import { ChecksAggregationItem } from '@monitoring/models';
import { Aggregation, AggregationsList } from '@monitoring/models/Aggregation';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isEmptyObj } from '@shared/utils/is-empty-object';
import { interpolateRdYlGn } from 'd3';

@Component({
  selector: 'hs-aggregation',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AggregationFacade],
})
export class AggregationComponent implements OnInit {
  @ViewChild('svgContainer', { read: ElementRef })
  svgContainer: ElementRef;

  aggregations$: Observable<AggregationsList>;
  canLoadLeft$: Observable<boolean>;
  canLoadRight$: Observable<boolean>;

  labelsWidth: number = 100;
  canvasWidth: number = 880;

  selectedAggregation: Aggregation | null;

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

        this.checkAndUpdateActiveColumn(aggregationList);
      })
    );

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
    this.selectedAggregation = aggregation;
    this.facade.selectAggregation(aggregation);
  }

  cellColor(agg: Aggregation, featureName: string) {
    const featureCheck = agg.featuresChecks[featureName];

    if (featureCheck === undefined) {
      return 'lightgrey';
    }
    const { passed, checks } = featureCheck;

    const ratio = checks / passed;
    if (ratio) {
      return interpolateRdYlGn(1 / ratio);
    } else {
      return 'lightgrey';
    }
  }

  metricCellColor(aggregation: Aggregation, metricName: string) {
    if (aggregation.metricsChecks[metricName] === undefined) {
      return 'lightgrey';
    }

    const { passed, checked } = aggregation.metricsChecks[metricName];

    const ratio = checked / passed;

    if (ratio) {
      return interpolateRdYlGn(1 / ratio);
    } else {
      return 'lightgrey';
    }
  }

  batchMetricCellColor(aggregation: Aggregation, batchName: string) {
    const batchChecks = aggregation.batchesChecks;
    if (isEmptyObj(batchChecks)) {
      return 'lightgrey';
    }

    let checked = 0;
    let passed = 0;

    for (const featureName in batchChecks) {
      if (batchChecks.hasOwnProperty(featureName)) {
        const element = batchChecks[featureName];

        if (element[batchName]) {
          checked = checked + element[batchName].checked;
          passed = passed + element[batchName].passed;
        } else {
          return 'lightgrey';
        }
      }
    }

    if (checked === 0) {
      return 'lightgrey';
    } else {
      return checked === passed ? 'fill: rgb(0, 104, 55)' : 'rgb(165, 0, 38)';
    }
  }

  loadOlder() {
    this.facade.loadOlder();
  }

  loadNewest() {
    this.facade.loadNewest();
  }

  private checkAndUpdateActiveColumn(aggregationList: AggregationsList): void {
    if (aggregationList.aggregations.length === 0) {
      this.selectedAggregation = null;
      return;
    }

    if (!this.selectedAggregation) {
      this.changeActiveColumn(
        aggregationList.aggregations[aggregationList.aggregations.length - 1]
      );
      return;
    }

    const newAggListHasCurrentColumn = aggregationList.aggregations.find(
      agg => agg.id === this.selectedAggregation.id
    );

    if (!newAggListHasCurrentColumn) {
      this.changeActiveColumn(
        aggregationList.aggregations[aggregationList.aggregations.length - 1]
      );
    }
  }
}
