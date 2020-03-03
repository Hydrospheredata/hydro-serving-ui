import { NgModule } from '@angular/core';
import {
  ModelVersionsTableComponent,
  MetricComponent,
  MetricsComponent,
  HealthTimelineComponent,
  ChartsComponent,
  ChartComponent,
  ModelVersionLogComponent,
  ReqResLogsComponent,
  ApplicationFormComponent,
  AggregationComponent,
  RequestsInformationComponent,
  LogComponent,
  CustomCheckComponent,
  CustomChecksComponent,
  LatencyCheckComponent,
  ErrorCheckComponent,
  LogDetailComponent,
  SignaturesComponent,
  RawChecksComponent,
  BatchMetricsComponent,
  LogMetricsTableComponent,
  ApplicationsItemDetailComponent,
  ModelVersionsComponent,
  ModelVersionDetailsComponent,
  ModelVersionsRowComponent,
  ScatterPlotComponent,
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
  CustomCheckComponent,
  CustomChecksComponent,
  LatencyCheckComponent,
  ErrorCheckComponent,
  LogDetailComponent,
  SignaturesComponent,
  RawChecksComponent,
  BatchMetricsComponent,
  LogMetricsTableComponent,
  ApplicationsItemDetailComponent,
  ModelVersionsComponent,
  ModelVersionDetailsComponent,
  ModelVersionsRowComponent,
  ScatterPlotComponent,
];

const DIRECTIVES = [UpdateModelVersionDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS],
})
export class TestingModule {}
