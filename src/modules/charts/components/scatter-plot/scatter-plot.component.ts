import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  ScatterPlotData,
  ScatterPlotPoint,
} from '@charts/models/scatter-plot-data.model';
import { ChartHelperService } from '@core/services/chart-helper.service';
import { select } from 'd3';
import { debounce } from 'lodash';
@Component({
  selector: 'hs-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScatterPlotComponent implements OnChanges {
  @Input() readonly data: ScatterPlotData;
  @Input() readonly colors: string[] = [];
  @Input() readonly top100: number[][] = [];
  @Input() readonly showTop100: boolean = false;

  @Output() selectPoint: EventEmitter<any> = new EventEmitter();

  @ViewChild('ccc', { read: ElementRef }) container: ElementRef;

  selectedIndex: number;
  hoveredIndex: number;
  links: Array<{ x1: number; x2: number; y1: number; y2: number }>;
  yScale;
  xScale;

  private yAxisOffset: number = 1;
  constructor(private chartHelper: ChartHelperService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.log('change');
      this.render();
    }
  }

  get chartHeight() {
    return 620;
  }

  get chartWidth() {
    return this.container.nativeElement.offsetWidth || 400;
  }

  get margins() {
    return {
      top: 24,
      right: 24,
      bottom: 24,
      left: 24,
    };
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

  onMouseEnter(_, index): void {
    this.hoveredIndex = index;
    this.drawLinksFromHoveredElement();
  }
  onMouseLeave(): void {
    this.hoveredIndex = undefined;
    select('.scatter-plot__links').selectAll('line').remove();
  }

  drawLinksFromHoveredElement() {
    if (this.top100) {
      const currentTop100 = this.top100[this.hoveredIndex];
      const self = this;
      const x1 = this.xScale(this.points[this.hoveredIndex].x);
      const y1 = this.yScale(this.points[this.hoveredIndex].y);
      select('.scatter-plot__links')
        .selectAll('line')
        .data(currentTop100)
        .join(
          enter =>
            enter
              .append('line')
              .attr('x1', x1)
              .attr('y1', y1)
              .attr('x2', i => {
                return self.xScale(this.points[i].x);
              })
              .attr('y2', i => {
                return self.yScale(this.points[i].y);
              })
              .attr('stroke', 'rgba(100,100,125, .15)')
              .attr('stroke-width', '1px'),
          update =>
            update
              .attr('x1', x1)
              .attr('y1', y1)
              .attr('x2', i => {
                return self.xScale(this.points[i].x);
              })
              .attr('y2', i => {
                return self.yScale(this.points[i].y);
              })
              .attr('stroke', 'rgba(100,100,125, .15)')
              .attr('stroke-width', '1px')
        );
    }
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
    return this.colors[index] ? this.colors[index] : '#c3d6ee';
  }

  onSelectPoint(index) {
    this.selectedIndex = index;
    this.selectPoint.emit(index);
  }

  hidePoint(index): boolean {
    if (this.hoveredIndex === undefined) {
      return false;
    }
    const set = new Set(this.top100[this.hoveredIndex]);
    if (!set.has(index)) {
      return true;
    }
    return false;
  }
}
