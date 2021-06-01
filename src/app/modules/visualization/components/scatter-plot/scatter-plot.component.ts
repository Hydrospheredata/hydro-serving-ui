import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { LinkRegime, Colorizer } from '@app/modules/visualization/models';
import {
  ScatterPlotData,
  ScatterPlotPoint,
} from '../../models/scatter-plot-data.model';
import {
  select,
  ScaleLinear,
  scaleLinear,
  axisBottom,
  axisLeft,
  contourDensity,
  geoPath,
} from 'd3';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';

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
export class ScatterPlotComponent implements OnChanges {
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

  @ViewChild('container', { read: ElementRef, static: true })
  container: ElementRef;
  @ViewChild('layout', { read: ElementRef, static: true }) layout: ElementRef;
  @ViewChild('svg', { read: ElementRef, static: true }) svg: ElementRef;
  @ViewChild('axisGroup', { read: ElementRef, static: true })
  axisGroup: ElementRef;
  @ViewChild('circles', { read: ElementRef, static: true })
  circlesGroup: ElementRef;
  @ViewChild('links', { read: ElementRef, static: true })
  linksGroup: ElementRef;
  @ViewChild('kde', { read: ElementRef, static: true }) kdeGroup: ElementRef;
  @ViewChild('supportiveLines', { read: ElementRef, static: true })
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
    const data = trainingPoints.map(({ x, y }) => [x, y]) as [number, number][];

    var color = scaleLinear<string>()
      .domain([0, 0.1])
      .range(['white', '#ffad37']);

    var densityData = contourDensity()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[1]);
      })
      .size([self.chartWidth, self.chartHeight])
      .bandwidth(12)(data);

    select(this.kdeGroup.nativeElement).selectAll('path').remove();
    select(this.kdeGroup.nativeElement)
      .selectAll('path')
      .data(densityData)
      .enter()
      .append('path')
      .attr('d', geoPath())
      .attr('fill', ({ value }) => color(value))
      .style('opacity', self.showTrainingData ? '.9' : '0')
      .style(
        'transform',
        `translate(${self.margins.left}px, ${self.margins.top}px)`
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
