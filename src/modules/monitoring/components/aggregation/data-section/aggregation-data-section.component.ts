import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AggregationsList, Aggregation, AggregationCheck } from '@monitoring/models';
import { interpolateRdYlGn } from 'd3';

@Component({
  selector: 'hs-aggregation-data-section',
  templateUrl: './aggregation-data-section.component.html',
  styleUrls: ['./aggregation-data-section.component.scss'],
})
export class AggregationDataSectionComponent implements OnInit {
  @Input() names: string[];
  @Input() type: 'features' | 'metrics';
  @Input() aggregationList: AggregationsList;
  @Input() selectedAggregation: Aggregation;
  @Output() columnClicked: EventEmitter<any> = new EventEmitter<any>();

  readonly labelsWidth: number = 100;
  readonly canvasWidth: number = 720; // 80 column limit * cell.width + padding
  readonly CELL_SIZE = { width: 8, height: 14 };
  private readonly COLUMN_MARGIN_RIGHT = 1;
  private readonly CELL_MARGIN_TOP = 1;

  get canvasHeight() {
    return this.names.length * (this.CELL_SIZE.height + this.CELL_MARGIN_TOP);
  }

  constructor() {}

  ngOnInit() {}

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

  cellColor(aggregation: Aggregation, name: string) {
    let check: AggregationCheck;
    switch (this.type) {
      case 'features':
        check = aggregation.featuresChecks[name];
        break;
      case 'metrics':
        check = aggregation.metricsChecks[name];
        break;
    }

    return this.getColor(check);
  }

  onColumnClick(column: any) {
    this.columnClicked.next(column);
  }

  private getColor(check: AggregationCheck): string {
    if (check === undefined) return 'lightgrey';

    const { passed, checked } = check;
    const ratio = checked / passed;

    return ratio ? interpolateRdYlGn(1 / ratio) : 'lightgrey';
  }
}
