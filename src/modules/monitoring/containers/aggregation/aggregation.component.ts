import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ChecksAggregationItem } from '@monitoring/interfaces';
import { interpolateRdYlGn } from 'd3';
import { AggregationFacade } from '@monitoring/containers/aggregation/aggregation.facade';
import { Observable } from '@node_modules/rxjs';
import { tap } from '@node_modules/rxjs/internal/operators';
import { union } from 'lodash';

@Component({
  selector: 'hs-aggregation',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AggregationFacade],
})
export class AggregationComponent {
  @ViewChild('svgContainer', { read: ElementRef })
  svgContainer: ElementRef;

  totalRequests$: Observable<number>;
  showedRequests$: Observable<number>;

  a$: Observable<ChecksAggregationItem[]>;
  canLoadLeft: boolean;
  canLoadRight: boolean;
  loading: boolean = false;
  labelsWidth: number = 100;
  canvasWidth: number = 880;
  selectedColumnId: string;

  aggregation: ChecksAggregationItem[];
  featureNames: string[] = [];
  metricNames: string[] = [];
  batchNames: string[] = [];

  readonly CELL_SIZE = 12;
  private COLUMN_MARGIN_RIGHT = 1;
  private CELL_MARGIN_TOP = 1;

  constructor(private readonly facade: AggregationFacade) {
    this.totalRequests$ = this.facade.totalRequests$;
    this.showedRequests$ = this.facade.showedRequests$;
    this.a$ = this.facade.aggregation$.pipe(
      tap(aggregation => {
        console.log(aggregation);
        this.aggregation = aggregation;
        if (aggregation) {
          if (aggregation.length) {
            this.featureNames = Object.keys(aggregation[0].features);
            this.metricNames = Object.keys(aggregation[0].metrics);
            this.batchNames = this.getBatchNames(aggregation);

            // TODO MOVE IT
            const selectedColumn = aggregation.find(
              agg => agg.additionalInfo._id === this.selectedColumnId
            );

            this.update(selectedColumn, aggregation);
            if (selectedColumn === undefined) {
              this.changeActiveColumn(aggregation[aggregation.length - 1]);
            }
          }
        }
      })
    );
  }

  get blockSize(): number {
    return 14;
  }

  get canvasHeight() {
    return this.featureNames.length * this.blockSize;
  }

  get metricsCanvasHeight() {
    return this.metricNames.length * this.blockSize;
  }

  get batchMetricsCanvasHeight() {
    return this.batchNames.length * this.blockSize;
  }

  get firstId(): string {
    if (this.aggregation.length) {
      return this.aggregation[0].additionalInfo._hs_first_id;
    }
  }

  get lastId(): string {
    if (this.aggregation.length) {
      return this.aggregation[this.aggregation.length - 1].additionalInfo
        ._hs_last_id;
    }
  }

  get dataAvailable(): boolean {
    return this.aggregation && this.aggregation.length > 0;
  }

  columnTranslate(index): string {
    return `translate(${
      index * this.CELL_SIZE + this.COLUMN_MARGIN_RIGHT * index
    }, 0)`;
  }

  rowTranslate(index): string {
    return `translate(0, ${
      index * this.CELL_SIZE + index * this.CELL_MARGIN_TOP
    })`;
  }

  changeActiveColumn(aggregation: ChecksAggregationItem) {
    const id = aggregation.additionalInfo._id;
    this.selectedColumnId = id;
    this.facade.selectAggregation(aggregation);
  }

  cellColor(column: ChecksAggregationItem, featureName: string) {
    if (column.features[featureName] === undefined) {
      return 'url(#repeat)';
    }

    const { passed, checked } = column.features[featureName];

    const ratio = checked / passed;

    if (ratio) {
      return interpolateRdYlGn(1 / ratio);
    } else {
      return 'url(#repeat)';
    }
  }

  metricCellColor(column: ChecksAggregationItem, metricName: string) {
    if (column.metrics[metricName] === undefined) {
      return 'url(#repeat)';
    }

    const { passed, checked } = column.metrics[metricName];

    const ratio = checked / passed;

    if (ratio) {
      return interpolateRdYlGn(1 / ratio);
    } else {
      return 'url(#repeat)';
    }
  }

  batchMetricCellColor(column: ChecksAggregationItem, batchName: string) {
    const batch = column.batch;
    if (batch === undefined) {
      return 'url(#repeat)';
    }

    let checked = 0;
    let passed = 0;

    for (const featureName in batch) {
      if (batch.hasOwnProperty(featureName)) {
        const element = batch[featureName];

        if (element[batchName]) {
          checked = checked + element[batchName].checked;
          passed = passed + element[batchName].passed;
        } else {
          return 'url(#repeat)';
        }
      }
    }

    if (checked === 0) {
      return 'url(#repeat)';
    } else {
      return checked === passed ? 'fill: rgb(0, 104, 55)' : 'rgb(165, 0, 38)';
    }
  }

  isSelected(column: ChecksAggregationItem): boolean {
    return this.selectedColumnId === column.additionalInfo._id;
  }

  loadOlder() {
    // this.loadedOlder.emit();
  }

  loadNewest() {
    // this.loadedNewest.emit();
  }

  private getBatchNames(aggregation: ChecksAggregationItem[]): string[] {
    return aggregation
      .filter(agg => agg.batch)
      .reduce((names, { batch }) => {
        return union(names, Object.keys(Object.values(batch)[0]));
      }, []);
  }

  private update(
    selectedColumn: ChecksAggregationItem,
    aggregation: ChecksAggregationItem[]
  ) {
    if (selectedColumn === undefined) {
      this.changeActiveColumn(aggregation[aggregation.length - 1]);
    }
  }
}
