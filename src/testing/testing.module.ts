import { NgModule } from '@angular/core';
import {
  ModelVersionsTableComponent,
  MetricComponent,
  MetricsComponent,
  HealthTimelineComponent,
  ChartsComponent,
  ChartComponent,
  MockReqstoreTableLogComponent,
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
  MockReqstoreTableLogComponent,
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
];

const DIRECTIVES = [UpdateModelVersionDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS],
})
export class TestingModule {}
