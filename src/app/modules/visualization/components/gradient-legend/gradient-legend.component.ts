import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'hs-gradient-legend',
  template: `<div class="gradient-legend" #anchor></div>`,
  styleUrls: ['./gradient-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientLegendComponent implements AfterViewInit {
  @ViewChild('anchor', { read: ElementRef }) anchorElement: ElementRef;

  ngAfterViewInit() {
    const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([0, 1]);
    const legendHeight = 48;
    const legendWidth = this.anchorElement.nativeElement.offsetWidth;
    const gradientHeight = 24;
    const margin = { top: 10, right: 20, bottom: 10, left: 4 };

    const viewWidth = legendWidth - margin.right - margin.left;

    const canvas = d3
      .select(this.anchorElement.nativeElement)
      .style('height', legendHeight + 'px')
      .style('width', legendWidth + 'px')
      .style('position', 'relative')
      .append('canvas')
      .attr('class', 'legend')
      .attr('height', 1)
      .attr('width', viewWidth)
      .style('height', gradientHeight + 'px')
      .style('width', viewWidth + 'px')
      .style('border', '1px solid #000')
      .style('position', 'absolute')
      .node();

    const ctx = canvas.getContext('2d');

    const legendScale = d3
      .scaleLinear()
      .range([1, viewWidth])
      .domain(colorScale.domain());

    const image = ctx.createImageData(viewWidth, 1);
    d3.range(viewWidth).forEach(i => {
      const { r, g, b } = d3.rgb(colorScale(legendScale.invert(i)));
      image.data[4 * i] = r;
      image.data[4 * i + 1] = g;
      image.data[4 * i + 2] = b;
      image.data[4 * i + 3] = 255;
    });
    ctx.putImageData(image, 0, 0);

    const legendAxis = d3
      .axisBottom(legendScale)
      .scale(
        d3
          .scaleLinear()
          .range([0, viewWidth - 1])
          .domain([0, 1])
      )
      .tickSize(6)
      .ticks(8);

    const svg = d3
      .select(this.anchorElement.nativeElement)
      .append('svg')
      .attr('height', legendHeight + 'px')
      .attr('width', viewWidth + 8 + 'px')
      .style('position', 'absolute');

    svg
      .append('g')
      .attr('class', 'axis')
      .style('transform', `translate(0px, ${gradientHeight - 1}px)`)
      .call(legendAxis);
  }
}
