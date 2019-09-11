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
  @ViewChild('svgContainer', { read: ElementRef })
  svgContainer: ElementRef;

  @Input() aggregation: ChecksAggregation[];
  @Input() latency: number[];
  @Input() errors: boolean[];
  @Output() changedSelectedColumn = new EventEmitter<number>();

  labelsWidth: number = 100;
  canvasWidth: number = 620;
  selectedColumn: number;

  readonly CELL_SIZE = 12;
  private COLUMN_MARGIN_RIGHT = 2;
  private CELL_MARGIN_TOP = 2;

  ngOnChanges(changes: SimpleChanges): void {
    const aggregation = changes.aggregation.currentValue;
    if (aggregation && aggregation.length) {
      this.changeActiveColumn(aggregation.length - 1);
    }
  }

  get canvasHeight() {
    return this.featureNames.length * 14;
  }

  columnTranslate(index): string {
    return `translate(${index * this.CELL_SIZE +
      this.COLUMN_MARGIN_RIGHT * index}, 0)`;
  }

  rowTranslate(index): string {
    return `translate(0, ${index * this.CELL_SIZE +
      index * this.CELL_MARGIN_TOP})`;
  }

  get countRequests(): number {
    if (this.aggregation) {
      return this.aggregation.reduce(
        (res, { _hs_requests }) => res + _hs_requests,
        0
      );
    }
    return 0;
  }

  get firstId(): string {
    if (this.aggregation) {
      return this.aggregation[0]._hs_first_id;
    }
  }
  get lastId(): string {
    if (this.aggregation) {
      return this.aggregation[this.aggregation.length - 1]._hs_last_id;
    }
  }

  get featureNames() {
    if (!this.aggregation) {
      return [];
    }

    const isNotSystemValue = str => str[0] !== '_';
    return Object.keys(this.aggregation[0]).filter(isNotSystemValue);
  }

  changeActiveColumn(index) {
    this.selectedColumn = index;
    this.changedSelectedColumn.next(index);
  }

  cellColor(column: ChecksAggregation, featureName: string) {
    const { passed, checks } = column[featureName];
    const value = (passed * checks) / 100;
    return interpolateRdYlGn(value);
  }
}
