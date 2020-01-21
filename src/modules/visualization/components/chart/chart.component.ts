import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ChartHelperService } from '@core/services/chart-helper.service';
import { VisualizationData, Labels } from 'modules/visualization/models';

@Component({
  selector: 'hs-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: VisualizationData;
  @Output() selectPoint: EventEmitter<any> = new EventEmitter();

  get chartHeight() {
    return this.chartConfig.height;
  }
  get chartWidth() {
    return this.chartConfig.width;
  }

  get margins() {
    return this.chartConfig.margins;
  }

  get viewWidth() {
    const { left, right } = this.margins;
    return this.chartWidth - left - right;
  }
  get viewHeight() {
    const { top, bottom } = this.margins;
    return this.chartHeight - top - bottom;
  }

  get yAxisTranslate() {
    const { left: x, top: y } = this.margins;
    return `translate(${x}, ${y})`;
  }
  get xAxisTranslate() {
    const { top, left: x } = this.margins;
    const y = top + this.viewHeight;

    return `translate(${x}, ${y})`;
  }

  get dataTranslate() {
    const { left: x, top: y } = this.margins;
    return `translate(${x}, ${y})`;
  }

  get selectedPoint(): [number, number] {
    if (this.selectedIndex !== undefined) {
      return this.data.data[this.selectedIndex];
    }
  }

  yScale;
  xScale;
  show: boolean = false;
  points: Array<[number, number]>;
  labels: Labels;
  labelNames: string[];
  selectedIndex;

  readonly chartConfig = {
    width: 500,
    height: 500,
    margins: {
      left: 24,
      right: 24,
      top: 24,
      bottom: 24,
    },
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private chartHelper: ChartHelperService
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    this.render();
  }

  render() {
    const response = this.data;
    const mapped: { x: number[]; y: number[] } = response.data.reduce(
      (res, cur) => {
        const [x, y] = cur;
        res.x.push(x);
        res.y.push(y);
        return res;
      },
      {
        x: [],
        y: [],
      }
    );

    const [minX, maxX] = this.chartHelper.extent(mapped.x);
    this.xScale = this.chartHelper
      .scaleLinear()
      .domain([minX, maxX])
      .range([0, this.viewWidth]);

    const [minY, maxY] = this.chartHelper.extent(mapped.y);
    this.yScale = this.chartHelper
      .scaleLinear()
      .domain([maxY, minY])
      .range([0, this.viewHeight]);

    this.show = true;
    this.labels = response.labels;

    this.points = response.data;

    this.cdr.detectChanges();
  }

  translatePoint([x, y]: [number, number]) {
    return `translate(${this.xScale(x)}, ${this.yScale(y)})`;
  }

  pointColor(index: number): string {
    return 'lightgrey';
  }

  onSelectPoint(index) {
    this.selectPoint.emit(index);
  }
}
