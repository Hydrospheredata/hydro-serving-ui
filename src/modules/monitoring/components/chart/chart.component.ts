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
  Renderer2,
} from '@angular/core';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { SonarMetricData, TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import * as d3 from 'd3';
import * as _ from 'lodash';
import {
  interval,
  Subscription,
  combineLatest,
  Observable,
  BehaviorSubject,
  of,
} from 'rxjs';
import { tap, map, filter, startWith, exhaustMap } from 'rxjs/operators';

interface Bound {
  from: number;
  to: number;
}

interface GroupedBounds {
  [uniqname: string]: Bound[];
}

interface GroupedData {
  [uniqname: string]: SonarMetricData[];
}

interface TooltipContent {
  timestamp: number;
  metrics: Array<{ name: string; value: number }>;
}

@Component({
  selector: 'hs-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChartComponent implements OnInit, OnDestroy {
  get featureList(): string[] {
    const features: string[] = [];

    for (let i = 0; i < 112; i++) {
      features.push(`${i}`);
    }

    return features;
  }
  @ViewChild('svg', { read: ElementRef }) svgElementRef: ElementRef;
  @ViewChild('rect', { read: ElementRef }) rectRef: ElementRef;
  @ViewChild('tooltip', { read: ElementRef }) tooltip: ElementRef;
  @ViewChild('activePoint', { read: ElementRef }) activePoint: ElementRef;
  @ViewChild('activeLine', { read: ElementRef }) activeLine: ElementRef;
  @Input() metrics: MetricSpecification[];
  @Input() selectedTimeInterval$: Observable<TimeInterval> = of(null);
  @Input() liveUpdate: boolean = true;

  @Input() timeBoundary: number = null;

  emptyData: boolean = true;
  showTooltip: boolean = false;
  tooltipContent: TooltipContent = null;

  canvasWidth: number;
  canvasHeight: number;
  groupedData: GroupedData;
  minValue: number;

  features: string[];
  selectedFeature: string = '0';
  selectedFeatureChanging$: BehaviorSubject<string> = new BehaviorSubject('');

  lineColors = ['#5786c1', '#ffdb89', '#b86efd', '#7cec7c'];
  areaColors = ['#1c67c31c', '#ffdb8947', '#b86efd29', '#7cec7c29'];
  thresholdColors = ['red', 'orange'];

  thresholds: string[];
  plotBands: GroupedBounds;

  private initialized: boolean = false;
  private data: SonarMetricData[];
  private chartWidth: number;
  private xScale;
  private xOffset: number = 40;
  private yScale;

  private log$: Subscription;

  constructor(
    private monitiringService: MonitoringService,
    private cdRef: ChangeDetectorRef,
    private vcRef: ViewContainerRef,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    const liveUpdate$ = interval(2000).pipe(
      filter(() => this.liveUpdate),
      startWith('')
    );

    this.log$ = combineLatest(
      liveUpdate$,
      this.selectedTimeInterval$,
      this.selectedFeatureChanging$
    )
      .pipe(
        exhaustMap(([upd, timeInterval]) => {
          return this.timeBoundary
            ? this.makeRequestInBoundary()
            : this.makeRequest(timeInterval);
        }),
        tap(() => this.setXScale()),
        tap(data => {
          this.emptyData = data.length === 0;
          this.data = data;
          this.render(data);
        })
      )
      .subscribe();

    d3.select(this.rectRef.nativeElement).on('mouseout', () =>
      this.onMouseOut()
    );

    d3.select(this.rectRef.nativeElement).on('mousemove', () =>
      this.onMouseMove()
    );
  }

  makeRequestInBoundary() {
    const i = `${this.timeBoundary}`;
    const observables = this.metrics.map(metricSpecification => {
      if (this.isKolmogorovSmirnov()) {
        return this.monitiringService.getMetrics({
          metricSpecification,
          interval: i,
          columnIndex: this.selectedFeature,
        });
      } else {
        return this.monitiringService.getMetrics({
          metricSpecification,
          interval: i,
        });
      }
    });

    return combineLatest(observables).pipe(map(data => _.flatten(data)));
  }

  makeRequest(timeIntreval: TimeInterval): Observable<SonarMetricData[]> {
    let from: string = '0';
    let till: string = `${Math.floor(new Date().getTime() / 1000)}`;
    if (timeIntreval && timeIntreval.from && timeIntreval.to) {
      from = `${Math.floor(timeIntreval.from / 1000)}`;
      till = `${Math.floor(timeIntreval.to / 1000)}`;
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
  }

  render(data: SonarMetricData[]) {
    if (this.initialized === false) {
      this.init();
    }

    this.setThreshold();
    this.setXScale(data);
    this.setYScale(data);
    this.minValue = this.findMinValue(data);

    this.groupedData = _.groupBy(
      data,
      d => `${d.name}#${d.labels.modelVersionId}`
    );

    this.setBoundaries(this.groupedData);
    this.cdRef.detectChanges();
  }

  isKolmogorovSmirnov(): boolean {
    return this.metrics[0].kind === 'KSMetricSpec';
  }

  onSelectFeature(e) {
    this.selectedFeatureChanging$.next(e);
  }

  private setBoundaries(groupedData) {
    try {
      if (_.isEmpty(groupedData)) {
        this.plotBands = {};
        return;
      }
      const metricSpecificationWithHealth = this.metrics.filter(
        metricSpec => metricSpec.withHealth === true
      );

      if (metricSpecificationWithHealth.length === 0) {
        this.plotBands = {};
        return;
      }

      const availableMetricNames = metricSpecificationWithHealth.map(
        ({ kind }) => this.monitiringService.getMetricsBySpecKind(kind)[0]
      );

      for (const key in groupedData) {
        if (groupedData.hasOwnProperty(key)) {
          const [metricName] = key.split('#');

          if (availableMetricNames.includes(metricName)) {
            const data: SonarMetricData[] = groupedData[key];

            const newPlotBands = {};
            let tmpBandObject: any = null;

            for (let i = 0, l = data.length; i < l; i++) {
              const isLastElement = i === data.length - 1;
              const currentMetricData = data[i];
              const {
                name,
                health,
                labels: { modelVersionId },
              } = currentMetricData;
              if (health === null) {
                break;
              }

              // plotBands
              const uniqName = `${name}#${modelVersionId}`;
              if (newPlotBands[uniqName] === undefined) {
                newPlotBands[uniqName] = [];
              }

              if (tmpBandObject) {
                if (health === false) {
                  tmpBandObject.to = currentMetricData;
                }
                if (health === true || isLastElement) {
                  newPlotBands[uniqName].push(Object.assign({}, tmpBandObject));
                  tmpBandObject = null;
                }
              } else {
                if (health === true) {
                  continue;
                }
                if (health === false) {
                  tmpBandObject = {
                    from: currentMetricData,
                    to: currentMetricData,
                  };
                }
              }
            }

            this.plotBands = newPlotBands;
          }
        }
      }
    } catch (error) {
      console.warn(error);
      this.plotBands = {};
    }
  }

  private setThreshold() {
    this.thresholds = this.metrics.reduce((acc, cur) => {
      if (cur.config.threshold) {
        acc.push(cur.config.threshold);
      }
      return acc;
    }, []);
  }

  private setXScale(data: SonarMetricData[] = []) {
    if (this.timeBoundary) {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - this.timeBoundary);
      this.xScale = d3
        .scaleTime()
        .domain([startDate, endDate])
        .range([0, this.chartWidth]);
    } else {
      const [timestampMin, timestampMax] = d3.extent(
        _.flatten(data),
        d => d.timestamp
      );

      this.xScale = d3
        .scaleTime()
        .domain([new Date(timestampMin), new Date(timestampMax)])
        .range([0, this.chartWidth]);
    }
  }

  private setYScale(data: SonarMetricData[]) {
    const [minValue, maxValue] = d3.extent(_.flatten(data), d => d.value);

    this.yScale = d3
      .scaleLinear()
      .domain([+maxValue, +minValue])
      .range([0, this.canvasHeight - 50]);
  }

  private onMouseMove() {
    const data = this.data;
    const [xCoordinate] = d3.mouse(this.rectRef.nativeElement);

    const selectedTime = Math.floor(this.xScale.invert(xCoordinate));
    const bisector = d3.bisector((d: SonarMetricData) => d.timestamp).right;
    const index = bisector(data, selectedTime, 1);
    const a = data[index - 1];
    const b = data[index];

    let res;

    if (a === undefined) {
      res = b;
    } else if (b === undefined) {
      res = a;
    } else {
      res = selectedTime - a.timestamp > b.timestamp - selectedTime ? b : a;
    }
    const newXCoordinate = this.xScale(res.timestamp);
    const newYCoordinate = this.yScale(res.value);

    this.tooltipContent = {
      timestamp: res.timestamp,
      metrics: [{ name: res.name, value: res.value }],
    };

    this.renderer2.setStyle(
      this.tooltip.nativeElement,
      'transform',
      `translate(${newXCoordinate}px, ${newYCoordinate}px)`
    );
    this.renderer2.setStyle(
      this.activeLine.nativeElement,
      'transform',
      `translate(${newXCoordinate}px, 0)`
    );

    this.showTooltip = true;
    this.cdRef.detectChanges();
  }

  private onMouseOut(): void {
    this.showTooltip = false;
    this.cdRef.detectChanges();
  }

  private findMinValue(data: SonarMetricData[]) {
    return d3.min(data, d => d.value);
  }
}
