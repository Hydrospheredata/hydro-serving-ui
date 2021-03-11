import { NgModule } from '@angular/core';
import { RequestDetailsModule } from '@app/modules/request-details/request-details.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { SharedModule } from '@app/shared/shared.module';
import { HsD3Module } from '@app/modules/hs-d3/hs-d3.module';
import { MonitoringRoutingModule } from './monitoring-routing.module';

import {
  CheckChartComponent,
  ErrorCheckComponent,
  LatencyCheckComponent,
  RegimeSelectorComponent,
  ReqstoreMetricsComponent,
  RequestsInformationComponent,
  TimeIntervalSelectComponent,
  AggregationHeaderComponent,
  AggregationDataSectionComponent,
  BatchDetailsComponent,
  RequestsComponent,
  AggregationDetailsSidebarComponent,
  RequestsFilterComponent,
  AggregationSidebarComponent,
  AggregationLegendComponent,
  BatchLatencyComponent,
  ModelVersionsTagsComponent,
  AddComparableComponent,
} from './components';

import { CheckIdToTimePipe } from './pipes';
import {
  MetricsEffects,
  MonitoringServiceStatusEffects,
  reducer,
} from './store';
import { AggregationEffects } from './store/effects/aggregation.effects';
import { ChecksEffects } from './store/effects/checks.effects';

import { RootCauseModule } from '@app/modules/root-cause/root-cause.module';

import {
  AggregationComponent,
  BatchMetricsComponent,
  MonitoringAvailabilityComponent,
  MonitoringPageComponent,
  CustomMetricsComponent,
  CustomMetricsComponentV2,
} from './containers';
import { HighchartsChartModule } from 'highcharts-angular';
import { CheckChartComponentV2 } from '@app/modules/monitoring/components/checks/check-chart_v2/check-chart_v2.component';

@NgModule({
  declarations: [
    AggregationComponent,
    ErrorCheckComponent,
    LatencyCheckComponent,
    MonitoringAvailabilityComponent,
    MonitoringPageComponent,
    ReqstoreMetricsComponent,
    TimeIntervalSelectComponent,
    CheckIdToTimePipe,
    RequestsInformationComponent,
    CheckChartComponent,
    CheckChartComponentV2,
    BatchMetricsComponent,
    RegimeSelectorComponent,
    CustomMetricsComponent,
    CustomMetricsComponentV2,
    AggregationHeaderComponent,
    AggregationDataSectionComponent,
    BatchDetailsComponent,
    RequestsComponent,
    AggregationDetailsSidebarComponent,
    RequestsFilterComponent,
    AggregationSidebarComponent,
    AggregationLegendComponent,
    BatchLatencyComponent,
    ModelVersionsTagsComponent,
    AddComparableComponent,
  ],
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
    StoreModule.forFeature('monitoring', reducer),
    EffectsModule.forFeature([
      MonitoringServiceStatusEffects,
      MetricsEffects,
      AggregationEffects,
      ChecksEffects,
    ]),
    RootCauseModule,
    MonitoringRoutingModule,
    RequestDetailsModule,
    HsD3Module,
    HighchartsChartModule
  ],
  exports: [MonitoringPageComponent],
})
export class MonitoringModule {}
