import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { VisualizationPageService } from '../../services';
import { VisualizationFacade } from '../../visualization.facade';

@Component({
  selector: 'hs-visualization',
  templateUrl: './visualization-page.component.html',
  styleUrls: ['./visualization-page.component.scss'],
  providers: [VisualizationPageService],
})
export class VisualizationPageComponent {
  selectedLabel: {[name: string]: string};
  selectedIndex: number;
  selectedPoint$: Observable<ScatterPlotPoint>;
  labels$: Observable<string[]>;
  colors$: Observable<string[]>;
  top100$: Observable<number[]>;
  scatterPlotData$: Observable<ScatterPlotData>;
  showTop100: boolean = false;
  constructor(
    private facade: VisualizationFacade,
    private visualization: VisualizationPageService
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

  handleSelectLabel(label: any): void {
    this.selectedLabel = label;
    this.visualization.selectLabel(label);
  }
}
