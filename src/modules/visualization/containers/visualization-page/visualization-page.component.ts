import { Component } from '@angular/core';
import { ScatterPlotData } from '@charts/models/scatter-plot-data.model';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/_index';
import { Colorizer } from 'modules/visualization/models/Colorizer';
import { VisualizationFacade } from 'modules/visualization/visualization.facade';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'hs-visualization',
  templateUrl: './visualization-page.component.html',
  styleUrls: ['./visualization-page.component.scss'],
  providers: [VisualizationFacade],
})
export class VisualizationPageComponent {
  selectedLabel: { [name: string]: string };
  showTop100: boolean = false;
  selectedCheck$: Observable<Check>;
  modelVersion$: Observable<ModelVersion>;
  loading$: Observable<boolean>;
  taskId$: Observable<string>;
  status$: Observable<string>;
  result$: Observable<any>;
  error$: Observable<string | null>;
  colors$: Observable<string[]>;
  top100$: Observable<number[][]>;
  scatterPlotData$: Observable<ScatterPlotData>;
  labelsNames$: Observable<string[]>;
  colorizers$: Observable<Colorizer[]>;
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

    this.service.loadEmbedding();
  }

  handleSelectPoint(index: number) {
    // this.selectedIndex = index;
    // this.service.selectIndex(index);
  }

  onChangeColorizer(colorizer: Colorizer): void {
    this.service.changeColorizer(colorizer);
  }

  retryRequest(): void {
    this.service.loadEmbedding();
  }
}
