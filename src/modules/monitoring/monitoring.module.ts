import {NgModule} from '@angular/core';
import {
  CheckChartComponent,
  CustomCheckComponent,
  CustomChecksComponent,
  DialogDeleteMetricComponent,
  DialogMetricComponent,
  DialogRequestsErrorsComponent,
  ErrorCheckComponent,
  LatencyCheckComponent,
  LogComponent,
  LogDetailComponent,
  LogMetricsTableComponent,
  MetricSpecConfigComponent,
  RawChecksComponent,
  ReqstoreMetricsComponent,
  RequestsInformationComponent,
  TimeIntervalSelectComponent,
} from '@monitoring/components';
import {CheckIdToTimePipe} from '@monitoring/pipes';
import {MonitoringService} from '@monitoring/services';
import {MetricsService} from '@monitoring/services/api/metrics.service';
import {MetricsEffects, MonitoringServiceStatusEffects, reducer,} from '@monitoring/store';
import {MonitoringPageFacade} from '@monitoring/store/facades';
import {MetricsFacade} from '@monitoring/store/facades/metrics.facade';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {SharedModule} from '@shared/shared.module';
import {
  AggregationComponent,
  BatchMetricsComponent,
  MetricsComponent,
  MonitoringAvailabilityComponent,
  MonitoringPageComponent
} from './containers';
import {RootCauseModule} from '@rootcause/root-cause.module';

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
    RootCauseModule
  ],
  exports: [MonitoringPageComponent, MetricsComponent],
  providers: [
    MetricsFacade,
    MetricsService,
    MonitoringPageFacade,
    MonitoringService,
  ],
})
export class MonitoringModule {
}
