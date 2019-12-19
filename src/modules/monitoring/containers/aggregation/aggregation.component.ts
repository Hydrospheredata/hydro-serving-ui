import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ChecksAggregation } from '@monitoring/interfaces';
import { interpolateRdYlGn } from 'd3';

@Component({
  selector: 'hs-aggregation',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggregationComponent implements OnChanges {
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
    return this.batchNames.size * this.blockSize;
  }

  get countRequests(): number {
    if (this.aggregation) {
      return this.aggregation.reduce(
        (res, { additionalInfo: { _hs_requests } }) => res + _hs_requests,
        0
      );
    }
    return 0;
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

  get featureNames(): string[] {
    return Object.keys(this.aggregation[0].features);
  }

  get metricNames(): string[] {
    return Object.keys(this.aggregation[0].metrics);
  }
  get batchNames() {
    const names = new Set([]);
    this.aggregation.forEach(aggregation => {
      const batch = aggregation.batch;
      if (batch !== undefined) {
        const firstFeature = Object.values(batch)[0];

        if (firstFeature) {
          Object.keys(firstFeature).forEach(n => {
            names.add(n);
          });
        }
      }
    }, []);

    return names;
  }

  get dataAvailable(): boolean {
    return this.aggregation && this.aggregation.length > 0;
  }

  @ViewChild('svgContainer', { read: ElementRef })
  svgContainer: ElementRef;

  @Input() aggregation: ChecksAggregation[] = [];
  @Input() latency: number[] = [];
  @Input() errors: boolean[] = [];
  @Input() canLoadLeft: boolean;
  @Input() canLoadRight: boolean;
  @Output() changedSelectedColumn = new EventEmitter<string>();
  @Output() loadedOlder = new EventEmitter<string>();
  @Output() loadedNewest = new EventEmitter<string>();

  labelsWidth: number = 100;
  canvasWidth: number = 880;
  selectedColumnId: string;

  readonly CELL_SIZE = 12;
  private COLUMN_MARGIN_RIGHT = 2;
  private CELL_MARGIN_TOP = 2;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.aggregation) {
      const aggregation: ChecksAggregation[] = changes.aggregation.currentValue;
      if (aggregation && aggregation.length) {
        const selectedColumn = aggregation.find(
          agg => agg.additionalInfo._id === this.selectedColumnId
        );

        this.update(selectedColumn, aggregation);
      }
    }
  }

  columnTranslate(index): string {
    return `translate(${index * this.CELL_SIZE +
      this.COLUMN_MARGIN_RIGHT * index}, 0)`;
  }

  rowTranslate(index): string {
    return `translate(0, ${index * this.CELL_SIZE +
      index * this.CELL_MARGIN_TOP})`;
  }

  changeActiveColumn(aggregation: ChecksAggregation) {
    const id = aggregation.additionalInfo._id;
    this.selectedColumnId = id;
    this.changedSelectedColumn.next(id);
  }

  cellColor(column: ChecksAggregation, featureName: string) {
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

  metricCellColor(column: ChecksAggregation, metricName: string) {
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
  batchMetricCellColor(column: ChecksAggregation, batchName: string) {
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

  isSelected(column: ChecksAggregation): boolean {
    return this.selectedColumnId === column.additionalInfo._id;
  }

  loadOlder() {
    this.loadedOlder.emit();
  }
  loadNewest() {
    this.loadedNewest.emit();
  }

  private update(
    selectedColumn: ChecksAggregation,
    aggregation: ChecksAggregation[]
  ) {
    if (selectedColumn === undefined) {
      this.changeActiveColumn(aggregation[aggregation.length - 1]);
    }
  }
}
