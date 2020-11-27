import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StatRoutingModule } from '@app/modules/stat/stat-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import {
  HistogramComponent,
  DriftStatusComponent,
  FeatureReportComponent,
  BivariateReportLegendComponent,
} from './components';
import {
  StatPageComponent,
  StatAvailabilityComponent,
  BivariateReportComponent,
} from './containers';
import { ColorByDriftDirective } from './directives';
import { HeatmapComponent } from './components/heatmap/heatmap.component';

@NgModule({
  declarations: [
    StatPageComponent,
    HistogramComponent,
    FeatureReportComponent,
    ColorByDriftDirective,
    StatAvailabilityComponent,
    DriftStatusComponent,
    HeatmapComponent,
    BivariateReportComponent,
    BivariateReportLegendComponent,
  ],
  imports: [SharedModule, CommonModule, StatRoutingModule],
  exports: [StatPageComponent],
})
export class StatModule {}
