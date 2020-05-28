import { ModelsPublicUiModule } from '@models/shared/models-public-ui.module';
import {
  CheckChartComponent,
  DialogDeleteMetricComponent,
  DialogMetricComponent,
  DialogRequestsErrorsComponent,
  ErrorCheckComponent,
  LatencyCheckComponent,
  LogComponent,
  LogDetailComponent,
  MetricsChecksComponent,
  MetricSpecConfigComponent,
  RawChecksComponent,
  RegimeSelectorComponent,
  ReqstoreMetricsComponent,
  RequestsInformationComponent,
  TimeIntervalSelectComponent,
  AggregationHeaderComponent,
  AggregationDataSectionComponent,
} from '@monitoring/components';
import { AggregationEffects } from '@monitoring/store/effects/aggregation.effects';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import {
  MetricsEffects,
  MonitoringServiceStatusEffects,
  reducer,
} from '@monitoring/store';
import { ChecksEffects } from '@monitoring/store/effects/checks.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import {
  AggregationComponent,
  BatchMetricsComponent,
  MetricsComponent,
  MonitoringAvailabilityComponent,
  MonitoringPageComponent,
} from './containers';
import { CustomMetricsComponent } from '@monitoring/containers';
import { RootCauseModule } from '@rootcause/root-cause.module';
import { NgModule } from '@angular/core';

@NgModule({
  entryComponents: [
    DialogDeleteMetricComponent,
    DialogMetricComponent,
    MetricsComponent,
    DialogRequestsErrorsComponent,
  ],
  declarations: [
    AggregationComponent,
    DialogDeleteMetricComponent,
    DialogMetricComponent,
    DialogRequestsErrorsComponent,
    ErrorCheckComponent,
    LatencyCheckComponent,
    MetricsComponent,
    MetricSpecConfigComponent,
    MonitoringAvailabilityComponent,
    MonitoringPageComponent,
    ReqstoreMetricsComponent,
    TimeIntervalSelectComponent,
    LogComponent,
    LogDetailComponent,
    CheckIdToTimePipe,
    RequestsInformationComponent,
    CheckChartComponent,
    RawChecksComponent,
    BatchMetricsComponent,
    RegimeSelectorComponent,
    CustomMetricsComponent,
    MetricsChecksComponent,
    AggregationHeaderComponent,
    AggregationDataSectionComponent,
  ],
  imports: [
    ModelsPublicUiModule,
    SharedModule,
    StoreModule.forFeature('monitoring', reducer),
    EffectsModule.forFeature([
      MonitoringServiceStatusEffects,
      MetricsEffects,
      AggregationEffects,
      ChecksEffects,
    ]),
    RootCauseModule,
  ],
  exports: [MonitoringPageComponent, MetricsComponent, LogDetailComponent],
})
export class MonitoringModule {}
