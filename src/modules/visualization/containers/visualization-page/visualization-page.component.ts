import { Component, OnInit } from '@angular/core';
import { ScatterPlotData } from '@charts/models/scatter-plot-data.model';
import { Colorizer } from '@core/models';
import { Check } from '@monitoring/models';
import { ModelVersion } from '@shared/_index';
import { VisualizationFacade } from 'modules/visualization/visualization.facade';
import { Observable } from 'rxjs';
import { LinkRegime } from '../../models/visualization';
import { VisualizationState } from '../../store';

@Component({
  selector: 'hs-visualization',
  templateUrl: './visualization-page.component.html',
  styleUrls: ['./visualization-page.component.scss'],
  providers: [VisualizationState, VisualizationFacade],
})
export class VisualizationPageComponent implements OnInit {
  selectedCheck$: Observable<Check>;
  modelVersion$: Observable<ModelVersion>;
  taskId$: Observable<string>;
  status$: Observable<string>;
  result$: Observable<any>;
  error$: Observable<string | null>;
  colors$: Observable<string[]>;
  top100$: Observable<number[][]>;
  counterfactuals$: Observable<number[][]>;
  scatterPlotData$: Observable<ScatterPlotData>;
  colorizers$: Observable<Colorizer[]>;
  colorizer$: Observable<Colorizer>;
  visualizationMetrics$: Observable<{ [name: string]: string }>;
  selectedId$: Observable<string>;
  message$: Observable<string>;
  linkRegime: LinkRegime = 'nearest';
  showTrainData: boolean;

  constructor(private service: VisualizationFacade) {}

  ngOnInit(): void {
    this.taskId$ = this.service.getTaskId();
    this.status$ = this.service.getStatus();
    this.result$ = this.service.getResult();
    this.scatterPlotData$ = this.service.getScatterPlotData();
    this.error$ = this.service.getError();
    this.colors$ = this.service.getColors();
    this.top100$ = this.service.getTop100();
    this.modelVersion$ = this.service.getModelVersion();
    this.selectedCheck$ = this.service.getSelectedCheck();
    this.colorizers$ = this.service.getColorizers();
    this.colorizer$ = this.service.getSelectedColorizer();
    this.counterfactuals$ = this.service.getCounterfactuals();
    this.visualizationMetrics$ = this.service.getVisualizationMetrics();
    this.selectedId$ = this.service.getSelectedId();
    this.message$ = this.service.getMessage();

    this.service.loadEmbedding();
  }

  handleSelectPoint(index: number) {
    this.service.changeSelectedPointIndex(index);
  }

  onChangeColorizer(colorizer: Colorizer): void {
    this.service.changeColorizer(colorizer);
  }

  retryRequest(): void {
    this.service.loadEmbedding();
  }

  onChangeShowTrainData(value: boolean) {
    this.showTrainData = value;
  }
}
