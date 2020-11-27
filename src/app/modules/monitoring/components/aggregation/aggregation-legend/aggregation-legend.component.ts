import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'hs-aggregation-legend',
  templateUrl: './aggregation-legend.component.html',
  styleUrls: ['./aggregation-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggregationLegendComponent {
  @ViewChild('anchor', { read: ElementRef }) anchorElement: ElementRef;

  get cells(): { color: string; label: string }[] {
    const res = [
      { color: d3.interpolateRdYlGn(0), label: '0% successful checks' },
      { color: d3.interpolateRdYlGn(0.25), label: '~25% successful checks' },
      { color: d3.interpolateRdYlGn(0.5), label: '50% successful checks' },
      { color: d3.interpolateRdYlGn(0.75), label: '~75% successful checks' },
      { color: d3.interpolateRdYlGn(1), label: '100% successful checks' },
    ];
    return res;
  }
}
