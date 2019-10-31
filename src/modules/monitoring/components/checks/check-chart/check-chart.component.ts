import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  ViewEncapsulation,
  Renderer2,
} from '@angular/core';
import { ChartConfig } from '@monitoring/interfaces';
import { scaleLinear, extent, select, mouse } from 'd3';
import { isEmpty } from 'lodash';

@Component({
  selector: 'hs-check-chart',
  templateUrl: './check-chart.component.html',
  styleUrls: ['./check-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CheckChartComponent implements OnInit {
  @ViewChild('trackableRect', { read: ElementRef }) rectRef: ElementRef;
  @ViewChild('tooltip', { read: ElementRef }) tooltipRef: ElementRef;
  @Input() readonly config: ChartConfig = {
    size: {
      width: 960,
      height: 180,
      margins: {
        left: 40,
        right: 20,
        top: 10,
        bottom: 24,
      },
    },
    name: 'default',
    data: {
      x: [],
      y: [],
    },
  };

  mouseIn: boolean = false;
  dotXPosition: number = 0;
  dotYPosition: number = 0;

  tooltipTranslate: string;
  tooltipText: string | number;

  get chartHeight() {
    return this.config.size.height;
  }
  get chartWidth() {
    return this.config.size.width;
  }

  get margins() {
    return this.config.size.margins;
  }

  get viewWidth() {
    const { left, right } = this.margins;
    return this.chartWidth - left - right;
  }
  get viewHeight() {
    const { top, bottom } = this.margins;
    return this.chartHeight - top - bottom;
  }

  get xData() {
    return this.config.data.x;
  }
  get yData() {
    return this.config.data.y;
  }

  get mappedData(): number[][] {
    if (this.xData.length !== this.yData.length) {
      throw Error('Datasets must have same length');
    }

    return this.xData.map((value, idx) => [value, this.yData[idx]]);
  }

  get name() {
    return this.config.name;
  }

  get clipUrl() {
    return `url(#${this.name})`;
  }

  get yScale() {
    const [min, max] = extent(this.yData);

    return scaleLinear()
      .domain([max, min])
      .range([0, this.viewHeight]);
  }

  get xScale() {
    return scaleLinear()
      .domain([1, this.xData.length])
      .range([0, this.viewWidth]);
  }

  get threshold() {
    return this.config.threshold;
  }

  get dataTranslate() {
    const { left: x, top: y } = this.margins;
    return `translate(${x}, ${y})`;
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

  get noData(): boolean {
    return isEmpty(this.xData) || isEmpty(this.yData);
  }

  constructor(private cdr: ChangeDetectorRef, private renderer2: Renderer2) {}

  ngOnInit() {
    select(this.rectRef.nativeElement).on('mouseout', () => this.onMouseOut());
    select(this.rectRef.nativeElement).on('mousemove', () =>
      this.onMouseMove()
    );
  }

  private onMouseMove(): void {
    this.mouseIn = true;

    const [xCoordinate] = mouse(this.rectRef.nativeElement);
    const xValue = Math.round(this.xScale.invert(xCoordinate));

    if (this.mappedData[xValue - 1]) {
      this.drawPoint(xValue);
      this.drawTooltip(xValue);
      this.cdr.detectChanges();
    }
  }

  private drawPoint(xValue: number) {
    const { top, left } = this.margins;
    this.dotXPosition = this.xScale(xValue) + left;
    this.dotYPosition = this.yScale(this.mappedData[xValue - 1][1]) + top;
  }

  private drawTooltip(xValue: number) {
    const { top, left } = this.margins;
    const x = this.xScale(xValue) + left;
    const y = this.yScale(this.mappedData[xValue - 1][1]) + top;

    this.renderer2.setStyle(
      this.tooltipRef.nativeElement,
      'transform',
      `translate(${x}px, ${y}px)`
    );
    this.tooltipText = this.mappedData[xValue - 1][1];
  }

  private onMouseOut(): void {
    this.mouseIn = false;
    this.cdr.detectChanges();
  }
}
