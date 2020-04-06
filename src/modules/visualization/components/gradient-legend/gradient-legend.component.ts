import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'hs-gradient-legend',
  template: `<div class="gradient-legend" #anchor></div>`,
  styleUrls: ['./gradient-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GradientLegendComponent implements AfterViewInit {
  @ViewChild('anchor', { read: ElementRef }) anchorElement: ElementRef;
  ngAfterViewInit() {
    const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([0, 1]);
    const legendHeight = 200;
    const legendWidth = 1056;
    const margin = { top: 10, right: 60, bottom: 10, left: 2 };

    const canvas = d3
      .select(this.anchorElement.nativeElement)
      .style('height', 48 + 'px')
      .style('width', legendWidth + 'px')
      .style('position', 'relative')
      .append('canvas')
      .attr('class', 'leg')
      .attr('height', legendHeight - margin.top - margin.bottom)
      .attr('width', 1)
      .style('height', '1056px')
      .style('width', '20px')
      .style('border', '1px solid #000')
      .style('position', 'absolute')
      .style('transform-origin', '10px 10px')
      .style('transform', 'rotate(-90px)')
      .node();

    const ctx = canvas.getContext('2d');

    const legendScale = d3
      .scaleLinear()
      .range([1, legendHeight - margin.top - margin.bottom])
      .domain(colorScale.domain());

    const image = ctx.createImageData(1, legendHeight);
    d3.range(legendHeight).forEach(i => {
      const { r, g, b } = d3.rgb(colorScale(legendScale.invert(i)));
      image.data[4 * i] = r;
      image.data[4 * i + 1] = g;
      image.data[4 * i + 2] = b;
      image.data[4 * i + 3] = 255;
    });
    ctx.putImageData(image, 0, 0);

    const legendAxis = d3
      .axisBottom(legendScale)
      .scale(d3.scaleLinear().range([0, 1056]).domain([0, 1]))
      .tickSize(6)
      .ticks(8);

    const svg = d3
      .select(this.anchorElement.nativeElement)
      .append('svg')
      .attr('height', 48 + 'px')
      .attr('width', legendWidth + 'px')
      .style('position', 'absolute')
      .style('left', '0px')
      .style('top', '0px');

    svg
      .append('g')
      .attr('class', 'axis')
      .style('transform', 'translate(-1px, 19px)')
      .call(legendAxis);
  }
}
