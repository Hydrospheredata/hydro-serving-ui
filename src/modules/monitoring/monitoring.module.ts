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
} from '@monitoring/components';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { MetricsEffects, MonitoringServiceStatusEffects, reducer, } from '@monitoring/store';
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
import { RootCauseModule } from "@rootcause/root-cause.module";
import { NgModule } from "@angular/core";

@NgModule({
  entryComponents: [
    DialogDeleteMetricComponent,
    DialogMetricComponent,
    MetricsComponent,
    DialogRequestsErrorsComponent
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
    MetricsChecksComponent
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
  exports: [MonitoringPageComponent, MetricsComponent, LogDetailComponent],
  providers: [],
})
export class MonitoringModule {
}
