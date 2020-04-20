import { Component } from '@angular/core';
import { ScatterPlotData } from '@charts/models/scatter-plot-data.model';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/_index';
import { VisualizationFacade } from 'modules/visualization/visualization.facade';
import { Observable } from 'rxjs';
import { Colorizer } from '@core/models';
import { LinkRegime } from "../../models/visualization";

@Component({
  selector: 'hs-visualization',
  templateUrl: './visualization-page.component.html',
  styleUrls: ['./visualization-page.component.scss'],
  providers: [VisualizationFacade],
})
export class VisualizationPageComponent {
  selectedCheck$: Observable<Check>;
  modelVersion$: Observable<ModelVersion>;
  loading$: Observable<boolean>;
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

  linkRegime: LinkRegime = 'nearest';

  constructor(private service: VisualizationFacade) {
    this.taskId$ = this.service.taskId$;
    this.status$ = this.service.status$;
    this.result$ = this.service.result$;
    this.scatterPlotData$ = this.service.scatterPlotData$;
    this.error$ = this.service.error$;
    this.colors$ = this.service.colors$;
    this.top100$ = this.service.top100$;
    this.modelVersion$ = this.service.modelVersion$;
    this.selectedCheck$ = this.service.selectedCheck$;
    this.colorizers$ = this.service.colorizers$;
    this.colorizer$ = this.service.selectedColorizer$;
    this.counterfactuals$ = this.service.counterfactuals$;
    this.visualizationMetrics$ = this.service.visualizationMetrics$;
    this.selectedId$ = this.service.selectedId$;
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
}
