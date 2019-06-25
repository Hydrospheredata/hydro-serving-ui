import { NgModule } from '@angular/core';
import {
  ModelVersionsTableComponent,
  MetricComponent,
  MetricsComponent,
  HealthTimelineComponent,
  ChartsComponent,
  ChartComponent,
  MockReqstoreTableLogComponent,
  ModelVersionLogComponent
} from '@testing/components';
import { ProfilesComponent } from '@testing/components/mock-profiles';

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
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class TestingModule {}
