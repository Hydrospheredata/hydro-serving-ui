import { NgModule } from '@angular/core';
import {
  AggregationComponent,
  ApplicationFormComponent,
  ApplicationsItemDetailComponent,
  BatchMetricsComponent,
  ChartComponent,
  ChartsComponent,
  CheckChartComponent,
  CustomCheckComponent,
  CustomChecksComponent,
  ErrorCheckComponent,
  GradientLegendComponent,
  HealthTimelineComponent,
  LatencyCheckComponent,
  LogComponent,
  LogDetailComponent,
  LogMetricsTableComponent,
  MetricComponent,
  MetricsComponent,
  ModelVersionDetailsComponent,
  ModelVersionLogComponent,
  ModelVersionsComponent,
  ModelVersionsRowComponent,
  ModelVersionsTableComponent,
  ModelVersionsTagsComponent,
  RawChecksComponent,
  RegimeSelectorComponent,
  ReqResLogsComponent,
  RequestsInformationComponent,
  ScatterPlotComponent,
  ScatterPlotLegendComponent,
  SignaturesComponent,
  VisualizationMetricsComponent,
} from '@testing/components';
import { ProfilesComponent } from '@testing/components/mock-profiles';
import { ServablesTableComponent } from '@testing/components/mock-servables-table.component';
import { UpdateModelVersionDirective } from '@testing/directives/test-update-model-version.directive';

const COMPONENTS = [
  ProfilesComponent,
  ModelVersionsTableComponent,
  MetricComponent,
  MetricsComponent,
  HealthTimelineComponent,
  ChartsComponent,
  ChartComponent,
  ModelVersionLogComponent,
  ReqResLogsComponent,
  ServablesTableComponent,
  ApplicationFormComponent,
  AggregationComponent,
  RequestsInformationComponent,
  LogComponent,
  LogDetailComponent,
  CustomCheckComponent,
  CustomChecksComponent,
  LatencyCheckComponent,
  ErrorCheckComponent,
  SignaturesComponent,
  RawChecksComponent,
  BatchMetricsComponent,
  LogMetricsTableComponent,
  ApplicationsItemDetailComponent,
  ModelVersionsComponent,
  ModelVersionDetailsComponent,
  ModelVersionsRowComponent,
  ModelVersionsTagsComponent,
  RegimeSelectorComponent,
  CheckChartComponent,
  ScatterPlotComponent,
  ScatterPlotLegendComponent,
  GradientLegendComponent,
  VisualizationMetricsComponent
];

const DIRECTIVES = [UpdateModelVersionDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS],
})
export class TestingModule {
}
