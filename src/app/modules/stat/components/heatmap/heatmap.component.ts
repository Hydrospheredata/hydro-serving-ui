import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { HeatmapConfig, HeatmapData } from '../../models';
import * as d3 from 'd3';
import { getColdWarmColor } from './coldwarm-color';

@Component({
  selector: 'hs-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapComponent implements OnInit {
  private _config: HeatmapConfig;
  @Input() set config(cfg: HeatmapConfig) {
    this._config = cfg;
    this.render();
  }
  @Output() hoveredItem: EventEmitter<HeatmapData> = new EventEmitter<
    HeatmapData
  >();

  @ViewChild('sgvEl', { read: ElementRef, static: true }) svgEl: ElementRef;
  @ViewChild('rootElement', { read: ElementRef, static: true })
  rootEl: ElementRef;

  private readonly axisLabelsColor: string = '#334e68';

  width: number = 1000;
  height: number = 160;
  margins = {
    top: 12,
    right: 24,
    bottom: 96,
    left: 96,
  };

  constructor() {}

  ngOnInit() {
    this.render();
  }

  private render(): void {
    const self = this;
    const config = this._config;
    // this.width = Math.max(
    //   this.rootEl.nativeElement.getBoundingClientRect().width,
    //   config.xLabels.length * 16
    // );

    this.width = this.rootEl.nativeElement.getBoundingClientRect().width;

    // tickvalues
    let tickValues = null;
    if (this.width < config.xLabels.length * 16) {
      tickValues = [
        config.xLabels[0],
        config.xLabels[config.xLabels.length - 1],
      ];
    }

    const onMouseOver = function (d: HeatmapData) {
      self.hoveredItem.next(d);
    };

    const onMouseLeave = function () {
      self.hoveredItem.next(undefined);
    };

    const svg = d3.select(this.svgEl.nativeElement);

    svg.selectAll('g').remove();
    svg.selectAll('text').remove();

    // scales
    const xScale = d3
      .scaleBand()
      .domain(this._config.xLabels)
      .range([0, this.width - this.margins.left - this.margins.right])
      .padding(0.05);

    const yScale = d3
      .scaleBand()
      .domain(config.yLabels)
      .range([this.height - this.margins.bottom - this.margins.top, 0]);
    // .padding(0.05);

    // axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickPadding(6)
      .tickValues(tickValues);

    const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(10);

    const xAxisSelection = svg
      .append('g')
      .call(xAxis)
      .classed('xAxis', true)
      .style(
        'transform',
        `translate(${this.margins.left}px, ${
          this.height - this.margins.bottom
        }px)`
      );

    xAxisSelection
      .selectAll('text')
      .style('transform', 'rotate(-45deg)')
      .style('transform-origin', '20px 46px');
    xAxisSelection.select('.domain').remove();

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ' ,' + (this.height - 12) + ')'
      )
      .style('text-anchor', 'middle')
      .style('fill', this.axisLabelsColor)
      .text(config.xAxisName);

    svg
      .append('g')
      .call(yAxis)
      .style(
        'transform',
        `translate(${this.margins.left}px, ${this.margins.top}px)`
      )
      .select('.domain')
      .remove();

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', -46)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('fill', this.axisLabelsColor)
      .text(config.yAxisName);

    // draw data

    const dataContainer = svg
      .append('g')
      .style(
        'transform',
        `translate(${this.margins.left}px, ${this.margins.top}px)`
      );

    dataContainer
      .selectAll('rect')
      .data(config.data)
      .join(enter =>
        enter
          .append('rect')
          .attr('x', d => xScale(d.x))
          .attr('y', d => yScale(d.y))
          .attr('rx', 4)
          .attr('ry', 0)
          .attr('width', xScale.bandwidth())
          .attr('height', yScale.bandwidth())
          .style('fill', ({ value }) => getColdWarmColor(value))
          .on('mouseover', onMouseOver)
          .on('mouseleave', onMouseLeave)
      );
  }

  get title() {
    return this._config.title;
  }
}
