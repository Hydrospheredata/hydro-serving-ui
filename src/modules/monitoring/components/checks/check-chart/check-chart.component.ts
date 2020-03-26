import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { ChartConfig } from '@monitoring/interfaces';
import { scaleLinear, extent, select, mouse } from 'd3';
import { isEmpty } from 'lodash';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { pluck, map, shareReplay } from 'rxjs/operators';

interface Point {
  x: number;
  y: number;
  color: string;
}

interface Tooltip {
  name: string;
  value: number;
  color: string;
}

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

  _config: Subject<ChartConfig> = new Subject();
  @Input() set config(cfg: ChartConfig) {
    this._config.next(cfg);
  }
  tooltipTranslate: string;

  activeCircles$: Observable<Array<{ x: number; y: number; color: string }>>;
  activeLinePosition$: Observable<{ x: number; y: number }>;
  chartHeight$: Observable<ChartConfig['size']['height']>;
  chartWidth$: Observable<ChartConfig['size']['width']>;
  clipUrl$: Observable<string>;
  config$: Observable<ChartConfig>;
  dataTranslate$: Observable<string>;
  legends$: Observable<string[]>;
  mappedData$: Observable<{ [name: string]: number[][] }>;
  mouseIn$: Observable<boolean>;
  name$: Observable<ChartConfig['name']>;
  size$: Observable<ChartConfig['size']>;
  tooltips$: Observable<Tooltip[]>;
  viewHeight$: Observable<number>;
  viewWidth$: Observable<number>;
  xAxisTranslate$: Observable<string>;
  xScale$: Observable<any>;
  yAxisTranslate$: Observable<string>;
  yScale$: Observable<any>;
  excludedUids$: Observable<string[]>;
  noData$: Observable<boolean>;
  threshold$: Observable<number>;
  plotBands$: Observable<any>;

  private mouseIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private excludedUids: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private cdr: ChangeDetectorRef) {
    // TODO: shit subscribe
    this.config$ = this._config.asObservable().pipe(shareReplay(1));
    this.threshold$ = this.config$.pipe(pluck('threshold'));
    this.plotBands$ = this.config$.pipe(pluck('plotBands'));
    this.name$ = this.config$.pipe(pluck('name'));
    this.clipUrl$ = this.name$.pipe(map(name => `url(#${name})`));
    this.size$ = this.config$.pipe(pluck('size'));
    this.chartHeight$ = this.size$.pipe(pluck('height'));
    this.chartWidth$ = this.size$.pipe(pluck('width'));
    this.viewWidth$ = this.size$.pipe(
      map(config => {
        const {
          width,
          margins: { left, right },
        } = config;
        return width - left - right;
      })
    );
    this.viewHeight$ = this.size$.pipe(
      map(config => {
        const {
          height,
          margins: { top, bottom },
        } = config;
        return height - top - bottom;
      })
    );
    this.dataTranslate$ = this.config$.pipe(
      map(config => {
        const { left: x, top: y } = config.size.margins;
        return `translate(${x}, ${y})`;
      }),
      shareReplay(1)
    );
    this.excludedUids$ = this.excludedUids.asObservable();
    this.mappedData$ = combineLatest(this.config$, this.excludedUids$).pipe(
      map(([config, excludedUids]) => {
        const entries = Object.entries(config.data);
        return entries.reduce((acc, [name, data]) => {
          if (!excludedUids.includes(name)) {
            acc[name] = data.x.map((value, idx) => [value, data.y[idx]]);
          }
          return acc;
        }, {});
      })
    );
    this.yScale$ = combineLatest(this.viewHeight$, this.mappedData$).pipe(
      map(([height, mappedData]) => {
        if (isEmpty(mappedData)) {
          return null;
        }
        const allYData = Object.values(mappedData)
          .map(arr => arr.map(i => i[1]))
          .reduce((acc, cur) => [...acc, ...extent(cur)]);

        const [min, max] = extent(allYData);

        return scaleLinear()
          .domain([max, min])
          .range([0, height]);
      }),
      shareReplay()
    );
    this.xScale$ = combineLatest(this.viewWidth$, this.config$).pipe(
      map(([width, config]) => {
        const requests = Object.values(config.data).map(({ x }) => x.length);
        const [, maxRequests] = extent(requests);
        return scaleLinear()
          .domain([1, maxRequests])
          .range([0, width]);
      }),
      shareReplay()
    );
    this.yAxisTranslate$ = this.config$.pipe(
      map(config => {
        const { left: x, top: y } = config.size.margins;
        return `translate(${x}, ${y})`;
      })
    );
    this.xAxisTranslate$ = combineLatest(this.size$, this.viewHeight$).pipe(
      map(([size, height]) => {
        const {
          margins: { top, left: x },
        } = size;
        const y = top + height;
        return `translate(${x}, ${y})`;
      })
    );
    this.legends$ = this.config$.pipe(
      map(config => {
        return Object.keys(config.data);
      })
    );

    this.mouseIn$ = combineLatest(
      this.mappedData$,
      this.mouseIn.asObservable()
    ).pipe(
      map(([mappedData, mouseIn]) => {
        if (isEmpty(mappedData)) {
          return false;
        }

        return mouseIn;
      })
    );
    this.activeLinePosition$ = combineLatest(
      this.mouseIn$,
      this.xScale$,
      this.size$,
      this.viewHeight$
    ).pipe(
      map(([mouseIn, xScale, size, viewHeight]) => {
        if (mouseIn) {
          const [xCoordinate] = mouse(this.rectRef.nativeElement);
          const xValue = Math.round(xScale.invert(xCoordinate));
          const { left, top } = size.margins;
          return { x: xScale(xValue) + left, y: viewHeight + top };
        } else {
          return { x: 0, y: 0 };
        }
      })
    );

    this.activeCircles$ = combineLatest(
      this.mouseIn,
      this.mappedData$,
      this.size$,
      this.xScale$,
      this.yScale$
    ).pipe(
      map(([mouseIn, mappedData, size, xScale, yScale]) => {
        if (mouseIn) {
          const { top, left } = size.margins;
          const [xCoordinate] = mouse(this.rectRef.nativeElement);
          const xValue = Math.round(xScale.invert(xCoordinate));

          return Object.values(mappedData).map((coordinatesTyples, idx) => ({
            x: xScale(xValue) + left,
            y: yScale(coordinatesTyples[xValue - 1][1]) + top,
            color: this.lineColor(idx),
          }));
        }
      })
    );

    this.tooltips$ = combineLatest(
      this.mouseIn,
      this.mappedData$,
      this.size$,
      this.xScale$,
      this.yScale$
    ).pipe(
      map(([mouseIn, mappedData, size, xScale, yScale]) => {
        if (mouseIn && !isEmpty(mappedData)) {
          const [xCoordinate] = mouse(this.rectRef.nativeElement);
          const xValue = Math.round(xScale.invert(xCoordinate));
          const { top, left } = size.margins;
          const x = xScale(xValue) + left;
          const z = Object.values(mappedData)[0][xValue - 1][1];
          const y = yScale(z) + top;

          this.tooltipTranslate = `translate(${x + 8}px, ${y}px)`;

          return Object.entries(mappedData).map(
            ([name, coordinatesTyples], idx) => ({
              name: `${name}`,
              value: coordinatesTyples[xValue - 1][1],
              color: this.lineColor(idx),
            })
          );
        } else {
          return [];
        }
      })
    );
    this.noData$ = this.mappedData$.pipe(map(data => isEmpty(data)));
    this.config$.subscribe();
  }

  ngOnInit() {
    select(this.rectRef.nativeElement).on('mouseout', () => this.onMouseOut());
    select(this.rectRef.nativeElement).on('mousemove', () =>
      this.onMouseMove()
    );
  }

  lineColor(index: number) {
    return ['#2680C2', '#F0B429', '#009688'][index];
  }

  toggleExclude(id: string): void {
    if (this.excludedUids.getValue().includes(id)) {
      this.removeFromExcludeList(id);
    } else {
      this.addToExcludeList(id);
    }

    this.cdr.detectChanges();
  }

  private addToExcludeList(id: string): void {
    this.excludedUids.next([...this.excludedUids.getValue(), id]);
  }

  private removeFromExcludeList(id: string): void {
    this.excludedUids.next(
      this.excludedUids.getValue().filter(idx => idx !== id)
    );
  }

  private onMouseMove(): void {
    this.mouseIn.next(true);
  }

  private onMouseOut(): void {
    this.mouseIn.next(false);
    this.cdr.detectChanges();
  }
}
