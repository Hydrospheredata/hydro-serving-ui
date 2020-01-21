import { Component } from '@angular/core';
import { VisualizationData } from 'modules/visualization/models';
import { VisualizationFacade } from 'modules/visualization/visualization.facade';
import { Observable } from 'rxjs';
import { startWith, filter, map } from 'rxjs/operators';

@Component({
  selector: 'hs-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
})
export class VisualizationComponent {
  selectedLabel: string;
  labelNames: string[] = [];
  selectedIndex: number;
  selectedPoint: number;

  data$: Observable<VisualizationData> = this.facade.data$;
  labelNames$: Observable<string[]> = this.data$.pipe(
    filter(val => val !== undefined),
    map(({ labels }) => Object.keys(labels)),
    startWith([])
  );
  constructor(private facade: VisualizationFacade) {}

  pointColor(index: number): string {
    return 'grey';
  }

  handleSelectPoint(index: number) {
    this.selectedIndex = index;
  }
}
