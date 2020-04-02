import { Component } from '@angular/core';
import {
  ScatterPlotPoint,
  ScatterPlotData,
} from '@charts/models/scatter-plot-data.model';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/_index';
import {
  VisualizationFacade,
  State,
} from 'modules/visualization/visualization.facade';
import { Observable, of } from 'rxjs';
import { VisualizationPageService, ColorBy } from '../../services';

@Component({
  selector: 'hs-visualization',
  templateUrl: './visualization-page.component.html',
  styleUrls: ['./visualization-page.component.scss'],
  providers: [VisualizationFacade],
})
export class VisualizationPageComponent {
  selectedLabel: { [name: string]: string };
  showTop100: boolean = false;
  // selectedMetric: string;

  // selectedIndex: number;
  // selectedPoint$: Observable<ScatterPlotPoint>;

  // selectedMetric$: Observable<Metric>;
  // selectedMetricName$: Observable<string>;

  // labels$: Observable<string[]>;
  // metrics$: Observable<string[]>;
  // colors$: Observable<string[]>;
  // top100$: Observable<number[][]>;
  // scatterPlotData$: Observable<ScatterPlotData>;
  // showTop100: boolean = false;
  // loading$: Observable<boolean>;
  // colorBy$: Observable<ColorBy>;
  // error$: Observable<string>;
  selectedCheck$: Observable<Check>;
  modelVersion$: Observable<ModelVersion>;
  loading$: Observable<boolean>;
  taskId$: Observable<string>;
  status$: Observable<string>;
  result$: Observable<any>;
  error$: Observable<string | null>;
  colors$: Observable<string[]>;
  top100$: Observable<number[]>;
  colorBy$: Observable<ColorBy>;
  scatterPlotData$: Observable<ScatterPlotData>;
  labelsNames$: Observable<string[]>;
  constructor(private service: VisualizationFacade) {
    this.loading$ = this.service.loading$;
    this.taskId$ = this.service.taskId$;
    this.status$ = this.service.status$;
    this.result$ = this.service.result$;
    this.scatterPlotData$ = this.service.scatterPlotData$;
    this.error$ = this.service.error$;
    this.colors$ = this.service.colors$;
    this.top100$ = of([]);
    this.colorBy$ = this.service.colorBy$;
    this.labelsNames$ = this.service.labelsNames$;
    this.modelVersion$ = this.service.modelVersion$;
    this.selectedCheck$ = this.service.selectedCheck$;

    this.service.loadEmbedding();
    // this.modelVersion$ = this.service.modelVersion$;
    // this.loading$ = this.service.loading$;
    // this.scatterPlotData$ = this.service.scatterPlotData$;
    // this.labels$ = this.service.labelsNames$;
    // this.metrics$ = this.service.metricNames$;
    // this.colors$ = this.service.colors$;
    // this.selectedPoint$ = this.service.selectedPoint$;
    // this.top100$ = this.service.top100$;
    // this.colorBy$ = this.service.colorBy$;
    // this.selectedMetric$ = this.service.selectedMetric$;
    // this.selectedMetricName$ = this.service.selectedMetricName$;
    // this.error$ = this.service.error$;
  }

  handleSelectPoint(index: number) {
    // this.selectedIndex = index;
    // this.service.selectIndex(index);
  }

  handleSelectLabel(label: any): void {
    this.selectedLabel = label;
    this.service.changeSelectedClassLabel(label);
  }
  // handleSelectMetric(metric: string): void {
  //   this.service.selectMetricName(metric);
  // }

  onColorByChange(colorBy: ColorBy): void {
    this.service.changeColorBy(colorBy);
  }

  retryRequest(): void {
    this.service.loadEmbedding();
  }
}
