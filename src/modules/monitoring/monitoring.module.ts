import { NgModule } from '@angular/core';
import {
  DialogMetricComponent,
  DialogDeleteMetricComponent,
  MetricSpecConfigComponent,
  ReqstoreMetricsComponent,
  InputOutputComponent,
  TimeIntervalSelectComponent,
  CustomChecksComponent,
  LatencyCheckComponent,
  ErrorCheckComponent,
  CustomCheckComponent,
  LogComponent,
  LogDetailComponent,
  RequestsInformationComponent,
  CheckChartComponent,
  DialogRequestsErrorsComponent,
  RawChecksComponent,
  LogMetricsTableComponent,
} from '@monitoring/components';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { MonitoringService } from '@monitoring/services';
import { MetricsService } from '@monitoring/services/api/metrics.service';
import {
  reducer,
  MonitoringServiceStatusEffects,
  MetricsEffects,
} from '@monitoring/store';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { MetricsFacade } from '@monitoring/store/facades/metrics.facade';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { VisualizationModule } from 'modules/visualization/visualization.module';
import {
  MonitoringAvailabilityComponent,
  MetricsComponent,
  MonitoringPageComponent,
  AggregationComponent,
  BatchMetricsComponent
} from './containers';
@NgModule({
  entryComponents: [
    DialogDeleteMetricComponent,
    DialogMetricComponent,
    MetricsComponent,
    DialogRequestsErrorsComponent,
  ],
  declarations: [
    AggregationComponent,
    CustomChecksComponent,
    CustomCheckComponent,
    DialogDeleteMetricComponent,
    DialogMetricComponent,
    DialogRequestsErrorsComponent,
    ErrorCheckComponent,
    InputOutputComponent,
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
    LogMetricsTableComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('monitoring', reducer),
    EffectsModule.forFeature([
      MonitoringServiceStatusEffects,
      MetricsEffects,
    ]),
  ],
  exports: [MonitoringPageComponent, MetricsComponent, LogDetailComponent],
  providers: [
    MetricsFacade,
    MetricsService,
    MonitoringPageFacade,
    MonitoringService,
  ],
})
export class MonitoringModule {}
