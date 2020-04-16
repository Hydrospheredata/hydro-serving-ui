import { NgModule } from '@angular/core';
import { ModelsPublicUiModule } from '@models/shared/models-public-ui.module';
import {
  DialogMetricComponent,
  DialogDeleteMetricComponent,
  TimeIntervalSelectComponent,
  LatencyCheckComponent,
  ErrorCheckComponent,
  LogComponent,
  LogDetailComponent,
  MetricSpecConfigComponent,
  ReqstoreMetricsComponent,
  RequestsInformationComponent,
  CheckChartComponent,
  DialogRequestsErrorsComponent,
  RawChecksComponent,
  LogMetricsTableComponent,
  RegimeSelectorComponent,
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
  MonitoringPageComponent,
} from './containers';
import { CustomMetricsComponent } from './containers/custom-metrics/custom-metrics.component';
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
    LogMetricsTableComponent,
    RegimeSelectorComponent,
    CustomMetricsComponent,
  ],
  imports: [
    ModelsPublicUiModule,
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
