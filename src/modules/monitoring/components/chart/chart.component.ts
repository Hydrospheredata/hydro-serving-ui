import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewContainerRef,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { SonarMetricData } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { interval, Subscription} from 'rxjs';
import { tap, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'hs-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart', { read: ElementRef}) chartElementRef: ElementRef;
  @Input() metric: MetricSpecification;

  private initialized: boolean = false;
  private data: SonarMetricData[];
  private canvas;
  private canvasWidth: number;
  private canvasHeight: number;
  private chartWidth: number;
  private xScale;
  private xAxis: d3.ScaleLinear<number, number>;
  private xOffset: number = 40;
  private yScale: d3.ScaleLinear<number, number>;
  private yAxis;
  private line;
  private activeLine;
  private activePoint;
  private tooltip;
  private area;

  private log$: Subscription;

  constructor(
    private monitiringService: MonitoringService,
    private vcRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    // TODO: change delay if respons didn't change

    this.log$ = interval(3000)
      .pipe(
        switchMap(() => {
          const from = '0';
          const till = `${Math.floor(new Date().getTime() / 1000)}`;
          return this.monitiringService.getDataInRange(this.metric, { from, till });
        }),
        tap(() => {
          if (this.initialized === false) {
            this.init();
            this.initialized = true;
          }
        }),
        tap(data => {
          if (!_.isEqual(this.data, data)) {
            this.data = data;
            this.render(data);
          }
        }),
        shareReplay()
    ).subscribe();
  }

  ngOnDestroy() {
    this.log$.unsubscribe();
  }

  init() {
    const el: HTMLElement = this.vcRef.element.nativeElement;
    const { width, height } = el.getBoundingClientRect();

    this.canvasWidth = width;
    this.canvasHeight = height;
    this.chartWidth = this.canvasWidth - this.xOffset;

    this.canvas = d3
      .select(this.chartElementRef.nativeElement)
      .append('svg')
        .attr('width', width)
        .attr('height', height);

    this.xAxis = this.canvas
      .append('g')
        .attr('class', 'xAxis')
        .attr('transform', 'translate(25,100)');

    this.yAxis = this.canvas
      .append('g')
        .attr('class', 'yAxis')
        .attr('transform', 'translate(25, 10)');

    this.line = this.canvas
      .append('path')
        .attr('class', 'line')
        .attr('transform', 'translate(25,10)');

    this.area = this.canvas
      .append('path')
        .attr('class', 'area')
        .attr('transform', 'translate(25,10)');

    this.activeLine = this.canvas
        .append('line')
          .attr('class', 'active-line')
          .attr('x1', 0)
          .attr('y1', 10)
          .attr('x2', 0)
          .attr('y2', height - 72);

    this.activePoint = this.canvas
      .append('circle')
      .attr('class', 'active-point')
      .attr('r', 3)
      .attr('opacity', 0);

    this.tooltip = d3
        .select(this.chartElementRef.nativeElement)
        .append('div')
          .attr('class', 'tooltip')
          .style('opacity', 0);
  }

  render(data: SonarMetricData[]) {
    if (data.length === 0) { return; }

    const [timestampMin, timestampMax] = d3.extent(data, d => d.timestamp);

    this.xScale = d3.scaleTime().domain(
      [
        new Date(timestampMin * 1000),
        new Date(timestampMax * 1000),
      ]
    ).range([0, this.chartWidth]);
    const xAxis = d3.axisBottom(this.xScale);

    // yAxis
    const [minValue, maxValue] = d3.extent(data, d => d.value);

    this.yScale = d3
      .scaleLinear()
      .domain([+maxValue, +minValue])
      .range([0, 90]);

    const yAxis = d3.axisLeft(this.yScale).ticks(5);

    // update axis
    this.xAxis.call(xAxis);
    this.yAxis.call(yAxis);

    const valueline = d3.line().curve(d3.curveMonotoneX)
      .x((d: any) => this.xScale(new Date(d.timestamp * 1000)))
      .y((d: any) => this.yScale(new Date(d.value)));

    this.line
      .data([data])
      .transition()
        .duration(500)
        .ease(d3.easeLinear)
      .attr('d', valueline);

    this.canvas.on('mousemove', () => { this.onMouseMove(); });

    this.canvas.on('mouseleave', () => {
        this.activeLine.attr('opacity', '0');
        this.tooltip.style('opacity', '0');
        this.activePoint.attr('opacity', '0');
    });

    const area = d3.area().curve(d3.curveMonotoneX)
      .x((d: any) => this.xScale(new Date(d.timestamp * 1000)))
      .y1((d: any) => this.yScale(new Date(d.value)))
      .y0(this.yScale(minValue));

    this.area
        .data([data])
        .attr('d', area);
  }

  private cursorOnChart(posX: number): boolean {
    return posX > 0 && posX < this.chartWidth;
  }

  private onMouseMove() {
    const [xCoordinate] = d3.mouse(this.line.node());

    if (!this.cursorOnChart(xCoordinate)) {
      this.activeLine.attr('opacity', '0');
      this.tooltip.attr('opacity', '0');
      this.activePoint.attr('opacity', '0');
      return;
    }

    const selectedTime = Math.floor(this.xScale.invert(xCoordinate) / 1000);
    const bisector = d3.bisector((d: SonarMetricData)  => d.timestamp).right;
    const index = bisector(this.data, selectedTime, 1);

    const a = this.data[index - 1];
    const b = this.data[index];

    const res = selectedTime - a.timestamp > b.timestamp - selectedTime ? b : a;
    const newXCoordinate = this.xScale(res.timestamp * 1000);
    const newYCoordinate = this.yScale(res.value);

    this.activeLine
        .transition()
          .duration(300)
          .ease(d3.easeLinear)
        .attr('x1', newXCoordinate + 25)
        .attr('x2', newXCoordinate + 25)
        .attr('opacity', '1');

    this.activePoint
        .transition()
          .duration(300)
          .ease(d3.easeLinear)
        .attr('cx', newXCoordinate + 25)
        .attr('cy', newYCoordinate + 10)
        .attr('opacity', '1');

    this.tooltip
        .transition()
          .duration(300)
          .ease(d3.easeLinear)
        .style('opacity', '1')
        .style('transform', `translate(${newXCoordinate + 65}px, 0px)`);

    this.tooltip
      .html(this.tooltipHtml(res));
  }

  private tooltipHtml({ value, timestamp }: SonarMetricData): string {
    return `
      <p>Value: ${value}</p>
      <p>Time ${new Date(timestamp * 1000)}</p>
    `;
  }
}
