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
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScatterPlotData,
  ScatterPlotPoint,
} from '@charts/models/scatter-plot-data.model';
import { Colorizer } from '@core/models';
import { ChartHelperService } from '@core/services/chart-helper.service';
import {
  select,
  ScaleLinear,
  extent,
  scaleLinear,
  axisBottom,
  axisLeft,
} from 'd3';
import { BehaviorSubject, Observable } from 'rxjs';
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScatterPlotComponent implements OnChanges, AfterViewInit, OnInit {
  private static removeLines() {
    select('.scatter-plot__links').selectAll('line').remove();
  }

  @Input() readonly data: ScatterPlotData;
  @Input() readonly colors: string[] = [];
  @Input() readonly top100: number[][] = [];
  @Input() readonly counterfactuals: number[][] = [];
  @Input() readonly colorizer: Colorizer;
  @Input() readonly showTrainingData: boolean = false;

  @Output() selectPoint: EventEmitter<number> = new EventEmitter();

  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @ViewChild('layout', { read: ElementRef }) layout: ElementRef;
  @ViewChild('svg', { read: ElementRef }) svg: ElementRef;
  @ViewChild('axisGroup', { read: ElementRef }) axisGroup: ElementRef;
  @ViewChild('circles', { read: ElementRef }) circlesGroup: ElementRef;
  @ViewChild('links', { read: ElementRef }) linksGroup: ElementRef;
  @ViewChild('supportiveLines', { read: ElementRef })
  supportiveLinesGroup: ElementRef;

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

  width: number = 800;
  height: number = 600;
  selectedIndex: number;
  regime: LinkRegime;

  constructor() {
    this.selectedPointIdx$ = this.selectedPointIndex.asObservable().pipe(
      distinctUntilChanged(),
      shareReplay(1),
      tap(index => {
        this.selectPoint.emit(index);
      })
    );
  }

  @Input() set linkRegime(regime: LinkRegime) {
    console.log('input');
    this.regime = regime;
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

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges =
      (changes.data && changes.data.currentValue) || this.data;
    this.render(dataChanges);
  }

  ngOnInit(): void {}
  ngAfterViewInit() {}

  private render({
    points,
    trainingPoints,
    minX,
    minY,
    maxX,
    maxY,
  }: ScatterPlotData) {
    this.width = this.container.nativeElement.offsetWidth;
    const xScale = this.generateXScale(points, +minX, +maxX);
    const yScale = this.generateYScale(points, +minY, +maxY);

    this.drawAxis({ xScale, yScale });
    this.drawTrainingData({ trainingPoints, xScale, yScale });
    this.drawCircles({ points, xScale, yScale });
    this.drawSupportiveLines({ xScale, yScale });
  }

  private drawTrainingData({
    trainingPoints,
    yScale,
    xScale,
  }: {
    trainingPoints: ScatterPlotPoint[];
    xScale: ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
  }) {
    const self = this;
    select(this.circlesGroup.nativeElement)
      .selectAll('rect')
      .data(trainingPoints)
      .join(
        enter =>
          enter
            .append('rect')
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', 'orange')
            .attr('x', point => xScale(point.x) + this.margins.left)
            .attr('y', point => yScale(point.y) + this.margins.top)
            .style('opacity', () => {
              return self.showTrainingData ? 0.3 : 0;
            }),
        update =>
          update.style('opacity', () => {
            return self.showTrainingData ? 0.3 : 0;
          })
      );
  }

  private drawCircles({
    points,
    yScale,
    xScale,
  }: {
    points: ScatterPlotPoint[];
    xScale: ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
  }): void {
    const self = this;
    const circles = select(this.circlesGroup.nativeElement)
      .selectAll('circle')
      .data(points)
      .join(
        enter =>
          enter
            .append('circle')
            .attr('cx', point => xScale(point.x) + this.margins.left)
            .attr('cy', point => yScale(point.y) + this.margins.top)
            .attr('r', 6)
            .attr('fill', (point, idx) => this.colors[idx] || 'lightblue')
            .attr('data-id', (d, i) => i),
        update =>
          update
            .attr('cx', point => xScale(point.x) + this.margins.left)
            .attr('cy', point => yScale(point.y) + this.margins.top)
            .attr('fill', (point, idx) => this.colors[idx] || 'lightblue')
      );

    circles.attr('opacity', function (point, index) {
      return self.chooseOpacityOnLeave(index);
    });

    circles.on('click', function (_, idx) {
      requestAnimationFrame(() => {
        const selectedIndex = +(this as SVGElement).dataset.id;
        self.selectedIndex = selectedIndex;
        self.selectPoint.next(selectedIndex);
        circles.classed('selected', function (_, index) {
          return index === selectedIndex;
        });
      });
    });
    circles.on('mouseenter', function (point) {
      requestAnimationFrame(() => {
        const hoveredIndex = +(this as SVGElement).dataset.id;
        const x = point.x;
        const y = point.y;
        let linkIndexes = [];
        switch (self.regime) {
          case 'nearest': {
            linkIndexes = self.top100[hoveredIndex];
            break;
          }
          case 'counterfactuals': {
            linkIndexes = self.counterfactuals[hoveredIndex];
            break;
          }
        }

        select(self.linksGroup.nativeElement).selectAll('line.link').remove();
        select(self.linksGroup.nativeElement)
          .selectAll('line')
          .data(linkIndexes)
          .join(enter =>
            enter
              .append('line')
              .attr('class', 'link')
              .attr('x1', xScale(x) + self.margins.left)
              .attr('y1', yScale(y) + self.margins.top)
              .attr('x2', index => xScale(points[index].x) + self.margins.left)
              .attr('y2', index => yScale(points[index].y) + self.margins.top)
              .style('stroke', '#D9E2EC')
          );

        circles.attr('opacity', (point, idx) => {
          return self.chooseOpacityOnHover(hoveredIndex, idx);
        });
      });
    });

    circles.on('mouseleave', () => {
      requestAnimationFrame(() => {
        circles.attr('opacity', function (point, index) {
          return self.chooseOpacityOnLeave(index);
        });
        select(self.linksGroup.nativeElement).selectAll('line.link').remove();
      });
    });
  }

  private chooseOpacityOnHover(hoveredIndex: number, index: number): string {
    if (this.regime === 'all') {
      return '1';
    }
    const linkIndexes =
      this.regime === 'nearest'
        ? this.top100[hoveredIndex]
        : this.counterfactuals[hoveredIndex];
    if (hoveredIndex === index || linkIndexes.includes(index)) {
      return '1';
    } else {
      return '.3';
    }
  }

  private chooseOpacityOnLeave(index: number): string {
    if (this.regime === 'all' || this.selectedIndex === undefined) {
      return '1';
    }
    const linkIndexes =
      this.regime === 'nearest'
        ? this.top100[this.selectedIndex]
        : this.counterfactuals[this.selectedIndex];
    if (this.selectedIndex === index || linkIndexes.includes(index)) {
      return '1';
    } else {
      return '.3';
    }
  }

  private generateXScale(
    points: ScatterPlotPoint[],
    minX: number,
    maxX: number
  ): ScaleLinear<number, number> {
    return scaleLinear()
      .domain([minX, maxX])
      .range([0, this.width - (this.margins.left + this.margins.right)]);
  }
  private generateYScale(
    points: ScatterPlotPoint[],
    min,
    max
  ): ScaleLinear<number, number> {
    return scaleLinear()
      .domain([max, min])
      .range([0, this.height - (this.margins.bottom + this.margins.top)]);
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
    select(this.axisGroup.nativeElement).selectAll('.tick > line').remove();
    select(this.axisGroup.nativeElement)
      .selectAll('.tick > text')
      .attr('font-size', '11px')
      .attr('font-weight', 'bold')
      .attr('fill', '#486581');
  }
  private drawYAxis(yScale: ScaleLinear<number, number>): void {
    const yAxis = axisLeft(yScale);
    select(this.axisGroup.nativeElement).select('g.yAxis').remove();
    select(this.axisGroup.nativeElement)
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`)
      .attr('class', 'yAxis')
      .call(yAxis);
  }
  private drawXAxis(xScale: ScaleLinear<number, number>): void {
    const xAxis = axisBottom(xScale);
    select(this.axisGroup.nativeElement).select('g.xAxis').remove();
    select(this.axisGroup.nativeElement)
      .append('g')
      .attr(
        'transform',
        `translate(${this.margins.left}, ${this.height - this.margins.top})`
      )
      .attr('class', 'xAxis')
      .call(xAxis);
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

    groupSelection
      .selectAll('line.yLine')
      .data(yScale.ticks())
      .join(enter =>
        enter
          .append('line')
          .attr('class', 'yLine')
          .attr('x1', this.margins.left)
          .attr('y1', d => yScale(d) + this.margins.top)
          .attr('x2', this.width - this.margins.left)
          .attr('y2', d => yScale(d) + this.margins.top)
          .style('stroke', lineColor)
      );
    groupSelection
      .selectAll('line.xLine')
      .data(xScale.ticks())
      .join(enter =>
        enter
          .append('line')
          .attr('class', 'xLine')
          .attr('x1', d => xScale(d) + this.margins.left)
          .attr('y1', this.margins.top)
          .attr('x2', d => xScale(d) + this.margins.left)
          .attr('y2', this.height - this.margins.top)
          .style('stroke', lineColor)
      );
  }
}
