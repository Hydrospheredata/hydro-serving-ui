import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Output,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { ChartConfig } from '../../../models';
import { MonitoringPageService } from '../../../containers/monitoring-page/monitoring-page.service';
import {
  format,
  ticks,
  extent,
  mouse,
  scaleLinear,
  ScaleLinear,
  select,
  axisLeft,
  axisBottom,
} from 'd3';
import { BehaviorSubject } from 'rxjs';

interface Tooltip {
  x: number;
  y: number;
  values: Array<{
    name: string;
    color: string;
    value: number;
  }>;
}

@Component({
  selector: 'hs-check-chart',
  templateUrl: './check-chart.component.html',
  styleUrls: ['./check-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckChartComponent implements OnInit {
  @ViewChild('trackableRect', { read: ElementRef, static: true })
  rectRef: ElementRef;
  @ViewChild('containerEl', { read: ElementRef, static: true })
  containerEl: ElementRef;
  @ViewChild('axisGroup', { read: ElementRef, static: true })
  axisGroup: ElementRef;
  @ViewChild('supportiveLines', { read: ElementRef, static: true })
  supportiveLinesGroup: ElementRef;

  // config vars
  name: string = '';
  threshold: number;
  margins: ChartConfig['size']['margins'];

  // chart vars
  chartWidth: number;
  chartHeight: number;
  viewHeight: number;
  viewWidth: number;
  scaleX: ScaleLinear<any, any>;
  scaleY: ScaleLinear<any, any>;
  series: ChartConfig['series'];
  visibleSeries: ChartConfig['series'];
  plotBands: any[];
  activePoint: { x: number; y: number } | null;
  activeCircles: Array<{ x: number; y: number; color: string }>;
  tooltip: Tooltip | null;

  // translates
  dataTranslate: string;
  xAxisTranslate: string;
  thresholdTranslate: string;

  noData: boolean = false;
  clipUrl: string;
  cfg: ChartConfig;
  _config: BehaviorSubject<ChartConfig> = new BehaviorSubject(null);

  private mouseIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private excludedSeries: string[] = [];

  constructor(private cdr: ChangeDetectorRef, private monitoringPageService: MonitoringPageService) {}

  @Input() set config(cfg: ChartConfig) {
    this.cfg = cfg;

    this.name = cfg.name;
    this.clipUrl = `url(#${this.name}-clip-url)`;
    this.threshold = cfg.threshold;
    this.chartWidth =
      cfg.size.width || this.containerEl.nativeElement.offsetWidth;

    this.chartHeight = cfg.size.height || 180;
    this.margins = cfg.size.margins;

    const { top, bottom, left, right } = cfg.size.margins;
    const viewWidth = this.chartWidth - left - right;

    this.viewWidth = viewWidth > 0 ? viewWidth : 0;

    this.viewHeight = this.chartHeight - top - bottom;

    this.dataTranslate = `translate(${left}, ${top})`;
    this.xAxisTranslate = `translate(${left}, ${top + this.viewHeight})`;
    this.thresholdTranslate = `translate(0, ${top})`;
    this.plotBands = cfg.plotBands;

    this.render();
  }

  ngOnInit() {
    select(this.rectRef.nativeElement).on('mouseout', () => this.onMouseOut());
    select(this.rectRef.nativeElement).on('mousemove', () =>
      this.onMouseMove()
    );
    select(this.rectRef.nativeElement).on('click', () => this.onClick());
  }

  toggleExclude(seriesName: string): void {
    if (this.excludedSeries.includes(seriesName)) {
      this.removeFromExcludeList(seriesName);
    } else {
      this.addToExcludeList(seriesName);
    }
    this.render();
  }

  private render() {
    const cfg = this.cfg;

    this.series = cfg.series;

    this.visibleSeries = cfg.series.filter(
      series => !this.excludedSeries.includes(series.name)
    );

    this.noData = this.visibleSeries.length === 0;

    if (!this.noData) {
      const allValues = cfg.series.reduce(
        (acc, cur) => [...acc, ...cur.data],
        []
      );
      const countPoints = cfg.series[0].data.length;
      const [min, max] = extent(allValues);

      this.scaleY = scaleLinear()
        .domain([max, min])
        .range([0, this.viewHeight])
        .nice();

      this.scaleX = scaleLinear()
        .domain([1, countPoints])
        .range([0, this.viewWidth]);

      this.drawAxis({ xScale: this.scaleX, yScale: this.scaleY });
      this.drawSupportiveLines({ xScale: this.scaleX, yScale: this.scaleY });
    }

    this.cdr.detectChanges();
  }

  private addToExcludeList(seriesName: string): void {
    this.excludedSeries = [...this.excludedSeries, seriesName];
  }

  private removeFromExcludeList(seriesName: string): void {
    this.excludedSeries = this.excludedSeries.filter(
      name => name !== seriesName
    );
  }

  onClick() {
    const [xCoordinate] = mouse(this.rectRef.nativeElement);
    const newXPosition = this.scaleX(Math.round(this.scaleX.invert(xCoordinate)));
    const index = Math.floor(this.scaleX.invert(newXPosition));
    this.monitoringPageService.showCheckDetails(null, index);
  }

  private onMouseMove(): void {
    if (this.noData) {
      if (this.activePoint) {
        this.activePoint = null;
        this.activeCircles = [];
        this.tooltip = null;
        this.cdr.detectChanges();
      }
    } else {
      const [xCoordinate] = mouse(this.rectRef.nativeElement);
      const xValue = Math.round(this.scaleX.invert(xCoordinate));

      const { left, top } = this.margins;
      const newXPosition = this.scaleX(xValue);

      if (this.activePoint == null || newXPosition !== this.activePoint.x) {
        this.activePoint = { x: newXPosition + left, y: 0 };

        const index = Math.floor(this.scaleX.invert(newXPosition));
        // generate circles
        this.activeCircles = this.series.reduce((acc, series) => {
          const inverted = Math.floor(this.scaleX.invert(newXPosition) - 1);

          if (series.data[inverted]) {
            acc.push({
              x: newXPosition + left,
              y: this.scaleY(series.data[inverted]) + top,
              color: series.color,
            });
          }

          return acc;
        }, []);

        // generate tooltip
        // make shift position
        const tXPos =
          index === this.series[0].data.length
            ? newXPosition - 100
            : newXPosition;

        const inverted = Math.floor(this.scaleX.invert(newXPosition) - 1);
        const tYPos = this.scaleY(
          this.series
            .map(({ data }) => data[inverted])
            .reduce((acc, cur) => acc + cur, 0) / this.series.length
        );

        this.tooltip = {
          x: tXPos + left + 4,
          y: tYPos + 4,
          values: this.series.reduce((acc, series) => {
            if (series.data[inverted] !== undefined) {
              acc.push({
                name: series.name,
                color: series.color,
                value: series.data[inverted],
              });
            }

            return acc;
          }, []),
        };

        this.cdr.detectChanges();
      }
    }
  }

  private drawAxis({
    xScale,
    yScale,
  }: {
    xScale: ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
  }) {
    this.drawXAxis(xScale);
    this.drawYAxis(yScale);

    select(this.axisGroup.nativeElement).selectAll('path.domain').remove();
    select(this.axisGroup.nativeElement)
      .selectAll('.tick > line')
      .attr('color', '#8392a1');

    select(this.axisGroup.nativeElement)
      .selectAll('.tick > text')
      .attr('font-size', '11px')
      .attr('font-weight', 'bold')
      .attr('fill', '#486581');
  }

  private drawYAxis(yScale: ScaleLinear<number, number>): void {
    const yAxis = axisLeft(yScale)
      .ticks(this.viewHeight / 40)
      .tickSize(0);

    select(this.axisGroup.nativeElement).select('g.yAxis').remove();
    select(this.axisGroup.nativeElement)
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`)
      .attr('class', 'yAxis')
      .call(yAxis);
  }

  private drawXAxis(xScale: ScaleLinear<number, number>): void {
    const xAxis = axisBottom(xScale)
      .tickValues(this.getXTicks(xScale))
      .tickFormat(format(',.0f'))
      .tickSize(4);

    select(this.axisGroup.nativeElement).select('g.xAxis').remove();
    select(this.axisGroup.nativeElement)
      .append('g')
      .attr(
        'transform',
        `translate(${this.margins.left}, ${this.viewHeight + 2})`
      )
      .attr('class', 'xAxis')
      .call(xAxis);
  }

  private getXTicks(xScale: ScaleLinear<number, number>): number[] {
    const [min, max] = xScale.domain();

    const lessThan5 = max < 5;
    const higherThan10 = max > 10;
    const count = lessThan5 ? 1 : higherThan10 ? 10 : max;

    return ticks(min, max, count);
  }

  private drawSupportiveLines({
    xScale,
    yScale,
  }: {
    xScale: ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
  }): void {
    const groupSelection = select(this.supportiveLinesGroup.nativeElement);
    const lineColor = 'rgb(237, 239, 243)';
    groupSelection.selectAll('line').remove();

    groupSelection
      .selectAll('line.yLine')
      .data(yScale.ticks(this.viewHeight / 40))
      .join(enter =>
        enter
          .append('line')
          .attr('class', 'yLine')
          .attr('x1', this.margins.left)
          .attr('y1', d => yScale(d) + this.margins.top)
          .attr('x2', this.chartWidth - this.margins.right)
          .attr('y2', d => yScale(d) + this.margins.top)
          .style('stroke', lineColor)
      );
  }

  private onMouseOut(): void {
    if (!this.noData) {
      this.activePoint = null;
      this.activeCircles = [];
      this.tooltip = null;
      this.cdr.detectChanges();
    }
  }
}
