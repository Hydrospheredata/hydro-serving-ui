import { NgModule } from '@angular/core';
import { RequestDetailsModule } from '@app/modules/request-details/request-details.module';
import { VisualizationRoutingModule } from '@app/modules/visualization/visualization-routing.module';
import { MonitoringModule } from '../monitoring/monitoring.module';
import { SharedModule } from '@app/shared/shared.module';
import {
  VisualizationPageComponent,
  VisualizationAvailabilityComponent,
} from './containers';
import {
  VisualizationMetricsComponent,
  VisualizationParamsComponent,
  ScatterPlotComponent,
  ScatterPlotLegendComponent,
  GradientLegendComponent,
} from './components';
@NgModule({
  imports: [
    SharedModule,
    VisualizationRoutingModule,
    MonitoringModule,
    RequestDetailsModule,
  ],
  declarations: [
    VisualizationPageComponent,
    VisualizationMetricsComponent,
    VisualizationAvailabilityComponent,
    VisualizationParamsComponent,
    ScatterPlotComponent,
    ScatterPlotLegendComponent,
    GradientLegendComponent,
  ],
})
export class VisualizationModule {}
