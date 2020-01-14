import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { VisualizationService } from './vis.service';

interface Labels {
  ground_truth: number[];
  predicted: number[];
  confidences: number[];
  anomaly_label: number[];
  outlier_confidence: number[];
}
interface VisualizationData {
  data_shape: [number, number];
  data: Array<[number, number]>;
  labels: Labels;
  top_100: number[][];
}

@Component({
  selector: 'hs-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
  providers: [VisualizationService],
})
export class VisualizationComponent implements OnInit {
  yScale;
  xScale;
  show: boolean = false;
  points: Array<[number, number]>;
  labels: Labels;
  labelNames: string[];
  selectedLabel: string;
  response: VisualizationData;

  selectedIndex;

  readonly chartConfig = {
    width: 500,
    height: 500,
    margins: {
      left: 24,
      right: 24,
      top: 24,
      bottom: 24,
    },
  };

  data$: Observable<VisualizationData> = this.visualization.getData$();
  constructor(
    private visualization: VisualizationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.data$.subscribe(response => {
      this.response = response;
      this.render();
    });
  }

  render() {
    const response = this.response;
    const mapped: { x: number[]; y: number[] } = response.data.reduce(
      (res, cur) => {
        const [x, y] = cur;
        res.x.push(x);
        res.y.push(y);
        return res;
      },
      {
        x: [],
        y: [],
      }
    );

    const [minX, maxX] = d3.extent(mapped.x);
    this.xScale = d3
      .scaleLinear()
      .domain([minX, maxX])
      .range([0, this.viewWidth]);

    const [minY, maxY] = d3.extent(mapped.y);
    this.yScale = d3
      .scaleLinear()
      .domain([maxY, minY])
      .range([0, this.viewHeight]);

    this.show = true;
    this.labels = response.labels;
    this.labelNames = Object.keys(this.labels);
    this.points = response.data;

    this.cdr.detectChanges();
    console.log({ response, mapped, minX, maxX, minY, maxY });
  }

  get chartHeight() {
    return this.chartConfig.height;
  }
  get chartWidth() {
    return this.chartConfig.width;
  }

  get margins() {
    return this.chartConfig.margins;
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
    return `translate(${x}, ${y})`;
  }

  translatePoint([x, y]: [number, number]) {
    return `translate(${this.xScale(x)}, ${this.yScale(y)})`;
  }

  pointColor(index: number): string {
    const gt = this.labels[this.selectedLabel];
    if (gt === undefined) {
      return 'grey';
    }
    return gt[index] ? '#27AB83' : '#E12D39';
  }

  changedLabel(evt) {
    console.log(evt);
    this.render();
  }

  onSelectPoint(index) {
    this.selectedIndex = index;
  }

  get selectedPoint(): [number, number] {
    if (this.selectedIndex !== undefined) {
      return this.response.data[this.selectedIndex];
    }
  }
}
