import { Component } from '@angular/core';
import { LabelTypes } from '@core/models';
import { Observable } from 'rxjs';
import { VisualizationService } from '../../services';
import { VisualizationFacade } from '../../visualization.facade';

@Component({
  selector: 'hs-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
  providers: [VisualizationService],
})
export class VisualizationComponent {
  selectedLabel: LabelTypes;
  selectedIndex: number;
  selectedPoint$: Observable<ScatterPlotPoint>;
  labels$: Observable<string[]>;
  colors$: Observable<string[]>;
  top100$: Observable<number[]>;
  scatterPlotData$: Observable<ScatterPlotData>;
  showTop100: boolean = false;
  constructor(
    private facade: VisualizationFacade,
    private visualization: VisualizationService
  ) {
    this.scatterPlotData$ = this.visualization.scatterPlotData$;
    this.labels$ = this.facade.visualizationLabelNames$;
    this.colors$ = this.visualization.colors$;
    this.selectedPoint$ = this.visualization.selectedPoint$;
    this.top100$ = this.visualization.top100$;
  }

  handleSelectPoint(index: number) {
    this.selectedIndex = index;
    this.visualization.selectIndex(index);
  }

  handleSelectLabel(label: LabelTypes): void {
    this.selectedLabel = label;
    this.visualization.selectLabel(label);
  }
}
