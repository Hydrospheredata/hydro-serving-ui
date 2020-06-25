import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {
  HistogramComponent,
  DriftStatusComponent,
  FeatureReportComponent,
  ComparisonComponent,
} from './components';
import { StatPageComponent, StatAvailabilityComponent } from './containers';
import { ColorByDriftDirective } from './directives';

@NgModule({
  declarations: [
    StatPageComponent,
    HistogramComponent,
    FeatureReportComponent,
    ColorByDriftDirective,
    StatAvailabilityComponent,
    DriftStatusComponent,
    ComparisonComponent,
  ],
  imports: [SharedModule, CommonModule],
  exports: [StatPageComponent],
})
export class StatModule {}
