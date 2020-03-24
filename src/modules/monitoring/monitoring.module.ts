import { NgModule } from '@angular/core';
import { ModelsModule } from '@models/models.module';
import { ModelsPublicUiModule } from '@models/shared/models-public-ui.module';
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
  RegimeSelectorComponent,
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
import {
  MonitoringAvailabilityComponent,
  MetricsComponent,
  MonitoringPageComponent,
  AggregationComponent,
  BatchMetricsComponent,
  CustomMetricsComponent
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
    CustomMetricsComponent,
    RegimeSelectorComponent,
  ],
  imports: [
    ModelsPublicUiModule,
    SharedModule,
    StoreModule.forFeature('monitoring', reducer),
    EffectsModule.forFeature([
      MonitoringServiceStatusEffects,
      MetricsEffects,
    ]),
  ],
  exports: [MonitoringPageComponent, MetricsComponent],
  providers: [
    MetricsFacade,
    MetricsService,
    MonitoringPageFacade,
    MonitoringService,
  ],
})
export class MonitoringModule {}
