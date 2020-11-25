import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { ServableLogsComponent, ServablesTableComponent } from './containers';

@NgModule({
  declarations: [ServablesTableComponent, ServableLogsComponent],
  entryComponents: [ServableLogsComponent],
  imports: [SharedModule],
  exports: [ServablesTableComponent],
})
export class ServablesModule {}
