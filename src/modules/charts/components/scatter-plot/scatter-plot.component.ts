import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { ScatterPlotData, ScatterPlotPoint } from '@charts/models/scatter-plot-data.model';
import { ScatterPlotConfig } from '@core/models';
import { ChartHelperService } from '@core/services/chart-helper.service';

@Component({
  selector: 'hs-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
})
export class ScatterPlotComponent implements OnInit, OnChanges {
  @Input() readonly data: ScatterPlotData;
  @Input() readonly colors: string[] = [];
  @Input() readonly top100: number[] = [];
  @Input() readonly showTop100: boolean = false;
  @Output() selectPoint: EventEmitter<any> = new EventEmitter();
  selectedIndex: number;
  yScale;
  xScale;
  private yAxisOffset: number = 1;
  private scatterPlotConfig: ScatterPlotConfig = {
    height: 620,
    width: 620,
    margins: {
      top: 24,
      right: 24,
      bottom: 24,
      left: 24,
    },
  };

  constructor(private chartHelper: ChartHelperService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.log('change');
      this.render();
    }
  }

  get chartHeight() {
    return this.scatterPlotConfig.height;
  }
  get chartWidth() {
    return this.scatterPlotConfig.width;
  }
  get margins() {
    return this.scatterPlotConfig.margins;
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
    return `translate(${x + this.yAxisOffset}, ${y})`;
  }

  get points(): ScatterPlotPoint[] {
    return this.data.points;
  }

  render() {
    if (!this.data) {
      return;
    }
    const { minX, maxX, minY, maxY } = this.data;
    this.xScale = this.chartHelper
      .scaleLinear()
      .domain([minX, maxX])
      .range([0, this.viewWidth]);

    this.yScale = this.chartHelper
      .scaleLinear()
      .domain([maxY, minY])
      .range([0, this.viewHeight]);
  }

  translatePoint({ x, y }: ScatterPlotPoint) {
    return `translate(${this.xScale(x)}, ${this.yScale(y)})`;
  }

  pointColor(index: number): string {
    return this.colors[index] ? this.colors[index] : 'grey';
  }

  onSelectPoint(index) {
    this.selectedIndex = index;
    this.selectPoint.emit(index);
  }

  hidePoint(index): boolean {
    if (this.showTop100 && this.top100) {
      return  !this.top100.includes(index) && index !== this.selectedIndex;
    }

    return false;
  }
}
