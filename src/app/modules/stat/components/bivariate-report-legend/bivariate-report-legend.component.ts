import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { ViewChild, ElementRef } from '@node_modules/@angular/core';
import * as d3 from 'd3';
import { scale as coldWarmScale } from '../heatmap/coldwarm-color';

@Component({
  selector: 'hs-bivariate-report-legend',
  templateUrl: 'bivariate-report-legend.component.html',
  styleUrls: ['./bivariate-report-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BivariateReportLegendComponent implements AfterViewInit {
  @ViewChild('anchor', { read: ElementRef }) anchorElement: ElementRef;

  ngAfterViewInit() {
    const colorScale = coldWarmScale;
    const legendHeight = 260;
    const legendWidth = 260;
    const margin = { top: 10, right: 20, bottom: 10, left: 4 };

    const viewWidth = legendWidth - margin.right - margin.left;
    const viewHeight = legendHeight - margin.top - margin.bottom;

    const canvas = d3
      .select(this.anchorElement.nativeElement)
      .style('height', legendHeight + 'px')
      .style('width', legendWidth + 'px')
      .style('position', 'relative')
      .append('canvas')
      .attr('class', 'legend')
      .attr('height', 1)
      .attr('width', viewWidth)
      .style('height', 24 + 'px')
      .style('width', viewWidth + 'px')
      .style('border', '1px solid #000')
      .style('position', 'absolute')
      .style('transform', 'rotate(90deg) translate(12px, -24px)')
      .style('transform-origin', '10px 10px')
      .node();

    const ctx = canvas.getContext('2d');

    const legendScale = d3.scaleLinear().range([1, viewHeight]).domain([1, 0]);

    const image = ctx.createImageData(viewWidth, 1);
    d3.range(viewHeight).forEach(i => {
      const { r, g, b } = d3.rgb(colorScale(legendScale.invert(i)));
      image.data[4 * i] = r;
      image.data[4 * i + 1] = g;
      image.data[4 * i + 2] = b;
      image.data[4 * i + 3] = 255;
    });
    ctx.putImageData(image, 0, 0);

    const legendAxis = d3
      .axisLeft(legendScale)
      .scale(d3.scaleLinear().range([0, 234]).domain([1, 0]))
      .tickSize(4)
      .ticks(8);

    const svg = d3
      .select(this.anchorElement.nativeElement)
      .append('svg')
      .attr('height', 280 + 'px')
      .attr('width', viewWidth + 8 + 'px')
      .style('position', 'absolute');

    svg
      .append('g')
      .attr('class', 'axis')
      .style('transform', `translate(21px, 12px)`)
      .call(legendAxis)
      .select('.domain')
      .remove();
  }
}
