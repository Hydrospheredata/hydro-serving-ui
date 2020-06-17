import { NgModule } from '@angular/core';
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
  AggregationDetailsComponent,
} from '@monitoring/components';
import { CustomMetricsComponent } from '@monitoring/containers';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { MetricsEffects, MonitoringServiceStatusEffects, reducer } from '@monitoring/store';
import { AggregationEffects } from '@monitoring/store/effects/aggregation.effects';
import { ChecksEffects } from '@monitoring/store/effects/checks.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RootCauseModule } from '@rootcause/root-cause.module';
import { SharedModule } from '@shared/shared.module';
import { AggregationDetailsSidebarComponent } from './components/aggregation-details/components/aggregation-details-sidebar/aggregation-details-sidebar.component';
import { ChecksFilterComponent } from './components/aggregation-details/components/checks-filter/checks-filter.component';
import { ChecksListComponent } from './components/aggregation-details/components/checks-list/checks-list.component';
import { AggregationLegendComponent } from './components/aggregation/aggregation-legend/aggregation-legend.component';
import { AggregationSidebarComponent } from './components/aggregation/aggregation-sidebar/aggregation-sidebar.component';
import {
  AggregationComponent,
  BatchMetricsComponent,
  MetricsComponent,
  MonitoringAvailabilityComponent,
  MonitoringPageComponent,
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
    AggregationDetailsComponent,
    ChecksListComponent,
    AggregationDetailsSidebarComponent,
    ChecksFilterComponent,
    AggregationSidebarComponent,
    AggregationLegendComponent,
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
