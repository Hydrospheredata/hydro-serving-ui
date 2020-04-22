import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hs-visualization-metrics',
  templateUrl: './visualization-metrics.component.html',
  styleUrls: ['./visualization-metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizationMetricsComponent {
  @Input() visualizationMetrics: { [name: string]: string };
}
