import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { ChartConfig } from '@monitoring/interfaces';
import { extent, mouse, scaleLinear, ScaleLinear, select } from 'd3';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';

interface Tooltip {
  x: number;
  y: number;
  values: Array<{
    name: string,
    color: string,
    value: number,
  }>
}

@Component({
  selector: 'hs-check-chart',
  templateUrl: './check-chart.component.html',
  styleUrls: ['./check-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckChartComponent implements OnInit {
  @ViewChild('trackableRect', {read: ElementRef}) rectRef: ElementRef;

  config$: Observable<ChartConfig>;
  // config vars
  name: string = '';
  threshold: number;
  margins: ChartConfig['size']['margins'];

  // chart vars
  chartWidth: number;
  chartHeight: number;
  viewHeight: number = 0;
  viewWidth: number;
  scaleX: ScaleLinear<any, any>;
  scaleY: ScaleLinear<any, any>;
  series: ChartConfig["series"];
  visibleSeries: ChartConfig["series"];
  plotBands: any[];
  activePoint: { x: number, y: number } | null;
  activeCircles: Array<{ x: number; y: number, color: string }>;
  tooltip: Tooltip | null;
  // translates
  dataTranslate: string;
  yAxisTranslate: string;
  xAxisTranslate: string;
  thresholdTranslate: string;

  noData: boolean = false;
  clipUrl: string;
  @ViewChild('containerEl', {read: ElementRef}) containerEl: ElementRef;
  cfg: ChartConfig;
  private mouseIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private excludedSeries: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    setInterval(() => {
    }, 1000);
  }

  _config: BehaviorSubject<ChartConfig> = new BehaviorSubject(null);

  @Input() set config(cfg: ChartConfig) {
    this._config.next(cfg);
  }


  ngOnInit() {
    select(this.rectRef.nativeElement).on('mouseout', () => this.onMouseOut());
    select(this.rectRef.nativeElement).on('mousemove', () =>
      this.onMouseMove()
    );
    this.config$ = this._config.asObservable().pipe(
      filter(val => !!val),
      tap(cfg => {
        this.cfg = cfg;

        this.name = cfg.name;
        this.clipUrl = `url(#${this.name})`
        this.threshold = cfg.threshold;
        this.chartWidth = this.containerEl.nativeElement.offsetWidth;
        this.chartHeight = cfg.size.height || this.containerEl.nativeElement.offsetHeight;
        this.margins = cfg.size.margins;
        // calculate some properties
        const {top, bottom, left, right} = cfg.size.margins;
        const viewWidth = this.chartWidth - left - right;
        this.viewWidth = viewWidth > 0 ? viewWidth : 0;
        this.viewHeight = this.chartHeight - top - bottom;

        this.dataTranslate = `translate(${left}, ${top})`;
        this.xAxisTranslate = `translate(${left}, ${top + this.viewHeight})`;
        this.thresholdTranslate = `translate(0, ${top})`
        // scales
        this.render();

      }),
      shareReplay(1)
    );
    this.config$.subscribe();
  }

  toggleExclude(seriesName: string): void {
    if (this.excludedSeries.includes(seriesName)) {
      this.removeFromExcludeList(seriesName);
    } else {
      this.addToExcludeList(seriesName);
    }
    this.render()
  }

  private render() {
    const cfg = this.cfg;
    this.series = cfg.series;
    this.visibleSeries = cfg.series.filter(series => !this.excludedSeries.includes(series.name));
    this.noData = this.visibleSeries.length === 0;

    if (!this.noData) {
      const allValues = cfg.series.reduce((acc, cur) => [...acc, ...cur.data], []);
      const countPoints = cfg.series[0].data.length;
      const [min, max] = extent(allValues);
      this.scaleY = scaleLinear()
        .domain([max, min])
        .range([0, this.viewHeight]);
      this.scaleX = scaleLinear()
        .domain([1, countPoints])
        .range([0, this.viewWidth]);
    }

    this.cdr.detectChanges()
  }

  private addToExcludeList(seriesName: string): void {
    this.excludedSeries = [...this.excludedSeries, seriesName];
  }

  private removeFromExcludeList(seriesName: string): void {
    this.excludedSeries = this.excludedSeries.filter(name => name !== seriesName);
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
      const {left, top} = this.margins;

      const newXPosition = this.scaleX(xValue) + left;

      if (this.activePoint == null || newXPosition !== this.activePoint.x) {
        this.activePoint = {x: newXPosition, y: 0};
        const index = Math.floor(this.scaleX.invert(newXPosition));

        // generate circles
        this.activeCircles = this.series.map((series, idx) => ({
          x: newXPosition,
          y: this.scaleY(series.data[index - 1]) + top,
          color: series.color,
        }), []);

        // generate tooltip
        const l = this.series[0].data.length;
        const tXPos = index === l ? newXPosition - 100 : newXPosition;
        const tYPos = this.scaleY(this.series.map(({data}) => data[index - 1]).reduce((acc, cur) => acc + cur, 0) / this.series.length);
        this.tooltip = {
          x: tXPos + 4,
          y: tYPos + 4,
          values: this.series.map(series => {
            return {
              name: series.name,
              color: series.color,
              value: series.data[index - 1]
            }
          })
        }


        this.cdr.detectChanges();
      }
    }
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
