import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatPageComponent } from './containers';
import { HistogramComponent } from './components';
import { FeatureReportComponent } from './components/feature-report/feature-report.component';
import { SharedModule } from '@shared/shared.module';
import { ColorByDriftDirective } from './directives/color-by-drift.directive';
import { StatAvailabilityComponent } from './containers/stat-availability/stat-availability.component';

@NgModule({
  declarations: [
    StatPageComponent,
    HistogramComponent,
    FeatureReportComponent,
    ColorByDriftDirective,
    StatAvailabilityComponent,
  ],
  imports: [SharedModule, CommonModule],
  exports: [StatPageComponent],
})
export class StatModule {}
