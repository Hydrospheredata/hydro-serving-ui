import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
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
  imports: [SharedModule, CommonModule],
  exports: [StatPageComponent],
})
export class StatModule {}
