import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootCauseModule } from '@app/modules/root-cause/root-cause.module';
import { SharedModule } from '@app/shared/shared.module';
import {
  LogComponent,
  LogDetailComponent,
  MetricsChecksComponent,
  RawChecksComponent,
} from './components';
import { CheckIdToTimePipe } from './pipes';

const components = [
  LogComponent,
  LogDetailComponent,
  MetricsChecksComponent,
  RawChecksComponent,
];

@NgModule({
  declarations: [...components, CheckIdToTimePipe],
  exports: [...components],
  imports: [CommonModule, SharedModule, RootCauseModule],
})
export class RequestDetailsModule {}
