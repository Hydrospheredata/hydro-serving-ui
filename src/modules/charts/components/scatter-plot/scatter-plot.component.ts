import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ScatterPlotData,
  ScatterPlotPoint,
} from '@charts/models/scatter-plot-data.model';
import { Colorizer } from '@core/models';
import { ChartHelperService } from '@core/services/chart-helper.service';
import { select } from 'd3';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';
import { LinkRegime } from '../../../visualization/models/visualization';

interface Link {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

@Component({
  selector: 'hs-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScatterPlotComponent implements OnChanges, AfterViewInit {
  private static removeLines() {
    select('.scatter-plot__links').selectAll('line').remove();
  }

  @Input() readonly data: ScatterPlotData;
  @Input() readonly colors: string[] = [];
  @Input() readonly top100: number[][] = [];
  @Input() readonly counterfactuals: number[][] = [];
  @Input() readonly colorizer: Colorizer;
  @Output() selectPoint: EventEmitter<any> = new EventEmitter();
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @ViewChild('layout', { read: ElementRef }) layout: ElementRef;
  points: ScatterPlotPoint[] = [];
  links: Link[];
  selectedPointIdx$: Observable<number>;
  yScale;
  xScale;
  hoveredPointIndex: BehaviorSubject<number> = new BehaviorSubject(undefined);
  selectedPointIndex: BehaviorSubject<number> = new BehaviorSubject(undefined);
  changeLinkRegime: BehaviorSubject<LinkRegime> = new BehaviorSubject(
    undefined
  );

  constructor(
    private chartHelper: ChartHelperService,
    private cdr: ChangeDetectorRef
  ) {
    this.selectedPointIdx$ = this.selectedPointIndex.asObservable().pipe(
      distinctUntilChanged(),
      shareReplay(1),
      tap(index => {
        this.selectPoint.emit(index);
      })
    );
  }

  @Input() set linkRegime(regime: LinkRegime) {
    this.changeLinkRegime.next(regime);
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
    return `translate(${x + 1}, ${y})`;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.data && changes.data.currentValue) {
      const { minX, maxX, minY, maxY } = changes.data.currentValue;

      this.xScale = this.chartHelper
        .scaleLinear()
        .domain([minX, maxX])
        .range([0, this.viewWidth]);

      this.yScale = this.chartHelper
        .scaleLinear()
        .domain([maxY, minY])
        .range([0, this.viewHeight]);

      this.points = this.data.points.map((point: ScatterPlotPoint, idx) => ({
        ...point,
        translate: `translate(${this.xScale(point.x)}, ${this.yScale(
          point.y
        )})`,
        opacity: 0.85,
      }));
    }

    if (changes.colors && changes.colors.currentValue) {
      this.points = this.points.map((point: ScatterPlotPoint, idx) => ({
        ...point,
        color: this.colors[idx] || '#c3d6ee',
      }));
    }
  }

  ngAfterViewInit() {
    combineLatest([
      this.hoveredPointIndex.asObservable(),
      this.selectedPointIndex.asObservable(),
      this.changeLinkRegime.asObservable(),
    ])
      .pipe(
        tap(([hoveredIndex, selectedIndex, regime]) => {
          if (hoveredIndex === undefined || regime === 'all') {
            ScatterPlotComponent.removeLines();
            this.points.forEach(p => {
              p.opacity = 0.85;
            });
          }

          if (
            hoveredIndex === undefined &&
            selectedIndex !== undefined &&
            regime !== 'all'
          ) {
            const top100 =
              regime === 'nearest'
                ? this.top100[selectedIndex]
                : this.counterfactuals[selectedIndex];
            const set = new Set(top100);
            this.points.forEach((p, idx) => {
              p.opacity = idx === selectedIndex || set.has(idx) ? 1 : 0.25;
            });
          }

          if (hoveredIndex !== undefined && regime !== 'all') {
            const top100 =
              regime === 'nearest'
                ? this.top100[hoveredIndex]
                : this.counterfactuals[hoveredIndex];
            this.drawLinks(hoveredIndex, top100);
            const set = new Set(top100);
            this.points.forEach((p, idx) => {
              p.opacity = idx === hoveredIndex || set.has(idx) ? 1 : 0.25;
            });
          }

          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  private drawLinks(hoveredIndex: number, pointsTo: number[]) {
    const currentTop100 = pointsTo;
    const self = this;
    const x1 = this.xScale(this.points[hoveredIndex].x);
    const y1 = this.yScale(this.points[hoveredIndex].y);
    select('.scatter-plot__links')
      .selectAll('line')
      .data(currentTop100)
      .join(
        enter =>
          enter
            .append('line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', i => self.xScale(this.points[i].x))
            .attr('y2', i => self.yScale(this.points[i].y))
            .attr('stroke', 'rgba(100,100,125, .15)')
            .attr('stroke-width', '1px'),
        update =>
          update
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', i => self.xScale(this.points[i].x))
            .attr('y2', i => self.yScale(this.points[i].y))
            .attr('stroke', 'rgba(100,100,125, .15)')
            .attr('stroke-width', '1px')
      );
  }
}
