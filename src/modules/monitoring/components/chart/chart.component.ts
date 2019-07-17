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
import { HydroServingState } from '@core/reducers';
import {
  getSiblingVersions,
  getVersionByModelVersionId,
} from '@models/reducers';
import {
  TooltipContent,
  GroupedData,
  GroupedBounds,
} from '@monitoring/components/chart/chart.interfaces';
import { ChartService } from '@monitoring/components/chart/chart.service';
import { Store } from '@ngrx/store';
import { SonarMetricData, TimeInterval, ModelVersion } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import * as d3 from 'd3';
import * as _ from 'lodash';
import {
  Subscription,
  Observable,
  BehaviorSubject,
  of,
} from 'rxjs';
import {
  tap,
  map,
} from 'rxjs/operators';

@Component({
  selector: 'hs-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ChartService],
})
export class ChartComponent implements OnInit, OnDestroy {
  get featureList(): string[] {
    return this.chartService.featureList;
  }

  get comparedModelVerId() {
    return this.compareWithModelVersionId;
  }

  set comparedModelVerId(id) {
    this.compareWithModelVersionId = id;
    this.chartService.onComparedModelVersionIdChange(id);
  }
  @ViewChild('chart', { read: ElementRef }) chartRef: ElementRef;
  @ViewChild('svg', { read: ElementRef }) svgElementRef: ElementRef;
  @ViewChild('rect', { read: ElementRef }) rectRef: ElementRef;
  @ViewChild('tooltip', { read: ElementRef }) tooltip: ElementRef;
  @ViewChild('activePoint', { read: ElementRef }) activePoint: ElementRef;
  @ViewChild('activeLine', { read: ElementRef }) activeLine: ElementRef;

  // @Input() metrics: MetricSpecification[];
  @Input() selectedTimeInterval$: Observable<TimeInterval> = of(null);
  @Input() liveUpdate: boolean = true;

  msSpec: MetricSpecification;
  @Input() set metricSpecification(metricSpec: MetricSpecification) {
    this.msSpec = metricSpec;
    this.chartService.onMetricSpecificationChange(metricSpec);
  }
  @Input() set selectedTimeInterval(ti: TimeInterval) {
    this.chartService.onTimeIntervalChange(ti);
  }

  mainData: GroupedData;
  comparedData: GroupedData;
  emptyData: boolean = true;

  showTooltip: boolean = false;
  tooltipContent: TooltipContent = null;

  canvasWidth: number = 300;
  canvasHeight: number = 150;
  groupedData: GroupedData;
  minValue: number;

  features: string[];
  selectedFeature: string = '0';

  mainLineColors = ['#5786c1', '#ffdb89'];
  comparedLineColors = ['#b86efd', '#7cec7c'];
  areaColors = ['#1c67c31c', '#ffdb8947', '#b86efd29', '#7cec7c29'];
  thresholdColors = ['red'];

  thresholds: string[];
  plotBands: GroupedBounds;
  xScale;
  yScale;
  xSublines: any[];
  ySublines: any[];

  siblingModelVersions$: Observable<ModelVersion[]>;
  compareWithModelVersionId: number;

  private initialized: boolean = false;
  private data: SonarMetricData[];
  private chartWidth: number;
  private xOffset: number = 60;

  private log$: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private vcRef: ViewContainerRef,
    private renderer2: Renderer2,
    private store: Store<HydroServingState>,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    this.siblingModelVersions$ = this.store.select(getSiblingVersions);

    this.log$ = this.chartService
      .getData()
      .pipe(
        tap(() => this.setXScale()),
        tap(data => {
          this.emptyData = data.flattenData.length === 0;
          this.mainData = data.mainData;
          this.comparedData = data.comparedData;
          this.data = data.flattenData;
          this.render(data.flattenData);
        })
      )
      .subscribe();

    if (this.isKolmogorovSmirnov()) {
      this.chartService.feature.next(0);
    }

    d3.select(this.rectRef.nativeElement).on('mouseout', () =>
      this.onMouseOut()
    );

    d3.select(this.rectRef.nativeElement).on('mousemove', () =>
      this.onMouseMove()
    );
  }

  get chartName() {
    try {
      return this.mainMetric.name;
    } catch {
      return 'n/a';
    }
  }

  get mainMetric() {
    return this.msSpec;
  }

  ngOnDestroy() {
    this.log$.unsubscribe();
  }

  init(): void {
    const el: HTMLElement = this.vcRef.element.nativeElement;
    const { width, height } = el.getBoundingClientRect();

    this.canvasWidth = width;
    this.canvasHeight = height - 102;
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
    this.setBoundaries();
    this.setSubLines();
    this.cdRef.detectChanges();
  }

  isKolmogorovSmirnov(): boolean {
    return this.chartService.isKolmogorovSmirnov(this.mainMetric);
  }

  onSelectFeature(e) {
    this.chartService.onFeatureChange(e);
  }

  modelVersion(str: string) {
    const [name, id] = str.split('#');
    return this.store
      .select(getVersionByModelVersionId(+id))
      .pipe(map(version => `${name}_v${version}`));
  }

  private setSubLines() {
    this.ySublines = this.yScale.ticks().map(this.yScale);
    this.xSublines = this.xScale.ticks().map(this.xScale);
  }

  private setBoundaries() {
    const groupedData = this.mainData;
    try {
      if (_.isEmpty(groupedData)) {
        this.plotBands = {};
        return;
      }

      if (this.mainMetric.withHealth === false) {
        this.plotBands = {};
        return;
      }

      const availableMetricNames = this.chartService.getMetricsBySpecKind(this.mainMetric);

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
    if (this.mainMetric.config.threshold !== undefined) {
      this.thresholds = [this.mainMetric.config.threshold];
    } else {
      this.thresholds = [];
    }
  }

  private setXScale(data: SonarMetricData[] = []) {
    const [timestampMin, timestampMax] = d3.extent(
      _.flatten(data),
      d => d.timestamp
    );

    this.xScale = d3
      .scaleTime()
      .domain([new Date(timestampMin), new Date(timestampMax)])
      .range([0, this.chartWidth]);
  }

  private setYScale(data: SonarMetricData[]) {
    const [minValue, maxValue] = d3.extent(_.flatten(data), d => d.value);

    this.yScale = d3
      .scaleLinear()
      .domain([+maxValue, +minValue])
      .range([0, this.canvasHeight - 50]);
  }

  private onMouseMove() {
    const data = this.mainData;
    const entries = Object.entries(data);
    const [xCoordinate] = d3.mouse(this.rectRef.nativeElement);
    const selectedTime = Math.floor(this.xScale.invert(xCoordinate - 20));

    let newXCoordinate;
    let newYCoordinate;
    let etalon: SonarMetricData;

    if (entries.length === 0) {
      return;
    }
    const foundedElements = entries
      .map(([metricName, cur]) => {
        const bisector = d3.bisector((d: SonarMetricData) => d.timestamp).right;
        const index = bisector(cur, selectedTime, 1);
        const a = cur[index - 1];
        const b = cur[index];
        let res;

        if (a === undefined) {
          res = b;
        } else if (b === undefined) {
          res = a;
        } else {
          res = selectedTime - a.timestamp > b.timestamp - selectedTime ? b : a;
        }

        if (etalon) {
          if (etalon.timestamp === res.timestamp) {
            return res;
          } else {
            return null;
          }
        } else {
          etalon = res;
        }
        return res;
      })
      .filter(a => !!a);

    newXCoordinate = this.xScale(foundedElements[0].timestamp);
    newYCoordinate = this.yScale(foundedElements[0].value);

    this.showTooltips(foundedElements);

    this.renderer2.setStyle(
      this.activeLine.nativeElement,
      'transform',
      `translate(${newXCoordinate}px, 0)`
    );

    this.cdRef.detectChanges();
  }

  private onMouseOut(): void {
    this.showTooltip = false;
    this.cdRef.detectChanges();
  }

  private findMinValue(data: SonarMetricData[]) {
    return d3.min(data, d => d.value);
  }

  private showTooltips(res: SonarMetricData[]) {
    const chartWidth = this.chartRef.nativeElement.getBoundingClientRect()
      .width;
    const tooltipWidth = this.tooltip.nativeElement.getBoundingClientRect()
      .width;
    const newYCoordinate = this.yScale(res[0].value);
    let newXCoordinate = this.xScale(res[0].timestamp) + this.xOffset;

    const metrics = res.map(r => ({ name: r.name, value: r.value }));

    this.tooltipContent = {
      timestamp: res[0].timestamp,
      metrics,
    };

    if (newXCoordinate + tooltipWidth > chartWidth) {
      newXCoordinate = newXCoordinate - tooltipWidth;
    } else {
      newXCoordinate = this.xScale(res[0].timestamp);
    }

    this.renderer2.setStyle(
      this.tooltip.nativeElement,
      'transform',
      `translate(${newXCoordinate}px, ${newYCoordinate}px)`
    );

    this.showTooltip = true;
  }
}
