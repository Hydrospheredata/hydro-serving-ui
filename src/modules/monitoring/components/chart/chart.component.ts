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
  ChangeDetectorRef,
} from '@angular/core';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { SonarMetricData, TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { interval, Subscription, combineLatest, Observable, merge } from 'rxjs';
import { tap, map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'hs-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('svg', { read: ElementRef }) svgElementRef: ElementRef;
  @Input() metrics: MetricSpecification[];
  @Input() selectedTimeInterval: TimeInterval;
  @Input() liveUpdate: boolean = true;

  @Input() timeBoundary: number = null;

  canvasWidth: number;
  canvasHeight: number;
  groupedData: { [uniqname: string]: SonarMetricData[] };
  minValue: number;

  features: string[];
  selectedFeature: string = '0';

  lineColors = ['#5786c1', '#ffdb89', '#b86efd', '#7cec7c'];
  areaColors = ['#1c67c31c', '#ffdb8947', '#b86efd29', '#7cec7c29'];

  private initialized: boolean = false;
  private data: SonarMetricData[];
  private chartWidth: number;
  private xScale;
  private xOffset: number = 40;
  private yScale;
  private line;
  private activeLine;
  private activePoint;
  private tooltip;

  private log$: Subscription;

  constructor(
    private monitiringService: MonitoringService,
    private cdRef: ChangeDetectorRef,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const liveUpdate$ = interval(1000).pipe(filter(() => this.liveUpdate));

    this.log$ = merge(liveUpdate$)
      .pipe(
        switchMap(() => {
          return this.timeBoundary ? this.makeRequestInBoundary() : this.makeRequest();
        }),
        filter(data => this.isDifferentData(data)),
        tap(data => {
          this.data = data;
          this.render(data);
        })
      )
      .subscribe();
  }

  makeRequestInBoundary() {
    const interva = `${this.timeBoundary}`;
    const observables = this.metrics.map(metricSpecification => {
      if (this.isKolmogorovSmirnov()) {
        return this.monitiringService.getMetrics({
          metricSpecification,
          interval: interva,
          columnIndex: this.selectedFeature,
        });
      } else {
        return this.monitiringService.getMetrics({
          metricSpecification,
          interval: interva,
        });
      }
    });

    return combineLatest(observables).pipe(map(data => _.flatten(data))); 
  }

  makeRequest(): Observable<SonarMetricData[]> {
    let from: string = '0';
    let till: string = `${Math.floor(new Date().getTime() / 1000)}`;
    if (this.selectedTimeInterval) {
      from = `${Math.floor(this.selectedTimeInterval.from / 1000)}`;
      till = `${Math.floor(this.selectedTimeInterval.to / 1000)}`;
    }

    const observables = this.metrics.map(metric => {
      if (this.isKolmogorovSmirnov()) {
        return this.monitiringService.getMetricsInRange(metric, {
          from,
          till,
          columnIndex: this.selectedFeature,
        });
      } else {
        return this.monitiringService.getMetricsInRange(metric, {
          from,
          till,
        });
      }
    });

    return combineLatest(observables).pipe(map(data => _.flatten(data)));
  }

  ngOnDestroy() {
    this.log$.unsubscribe();
  }

  init(): void {
    const el: HTMLElement = this.vcRef.element.nativeElement;
    const { width, height } = el.getBoundingClientRect();

    this.canvasWidth = width;
    this.canvasHeight = height - 82;
    this.chartWidth = this.canvasWidth - this.xOffset;
    this.initialized = true;

    // this.cdRef.detectChanges();

    // this.activeLine = this.svgElementRef.nativeElement
    //     .append('line')
    //       .attr('class', 'active-line')
    //       .attr('x1', 0)
    //       .attr('y1', 10)
    //       .attr('x2', 0)
    //       .attr('y2', height - 72);

    // this.activePoint = this.svgElementRef.nativeElement
    //   .append('circle')
    //   .attr('class', 'active-point')
    //   .attr('r', 3)
    //   .attr('opacity', 0);

    // this.tooltip = d3
    //     .select(this.svgElementRef.nativeElement)
    //     .append('div')
    //       .attr('class', 'tooltip')
    //       .style('opacity', 0);
  }

  render(data: SonarMetricData[]) {
    if (this.initialized === false) {
      this.init();
    }

    this.setXScale(data);
    this.setYScale(data);
    this.minValue = this.findMinValue(data);

    this.groupedData = _.groupBy(
      data,
      d => `${d.name}_${d.labels.modelVersionId}`
    );
    this.cdRef.detectChanges();
  }

  isKolmogorovSmirnov(): boolean {
    return this.metrics[0].kind === 'KSMetricSpec';
  }

  private setXScale(data: SonarMetricData[]) {
    const [timestampMin, timestampMax] = d3.extent(
      _.flatten(data),
      d => d.timestamp
    );

    this.xScale = d3
      .scaleTime()
      .domain([new Date(timestampMin * 1000), new Date(timestampMax * 1000)])
      .range([0, this.chartWidth]);
  }

  private setYScale(data: SonarMetricData[]) {
    const [minValue, maxValue] = d3.extent(_.flatten(data), d => d.value);

    this.yScale = d3
      .scaleLinear()
      .domain([+maxValue, +minValue])
      .range([0, this.canvasHeight - 50]);
  }

  private cursorOnChart(posX: number): boolean {
    return posX > 0 && posX < this.chartWidth;
  }

  private onMouseMove(data) {
    const [xCoordinate] = d3.mouse(this.line.node());

    if (!this.cursorOnChart(xCoordinate)) {
      this.activeLine.attr('opacity', '0');
      this.tooltip.attr('opacity', '0');
      this.activePoint.attr('opacity', '0');
      return;
    }

    const selectedTime = Math.floor(this.xScale.invert(xCoordinate) / 1000);
    const bisector = d3.bisector((d: SonarMetricData) => d.timestamp).right;
    const index = bisector(data, selectedTime, 1);

    const a = data[index - 1];
    const b = data[index];

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

    this.tooltip.html(this.tooltipHtml(res));
  }

  private tooltipHtml({ value, timestamp }: SonarMetricData): string {
    return `
      <p>Value: ${value}</p>
      <p>Time ${new Date(timestamp * 1000)}</p>
    `;
  }

  private isDifferentData(newData: SonarMetricData[]): boolean {
    return !_.isEqual(this.data, newData);
  }

  private findMinValue(data: SonarMetricData[]) {
    return d3.min(data, d => d.value);
  }

  get featureList(): string[] {
    const features: string[] = [];

    for (let i = 0; i < 112; i++) {
      features.push(`${i}`);
    }

    return features;
  }
}
