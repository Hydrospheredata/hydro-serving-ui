import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { ServableLogsComponent, ServablesTableComponent } from './containers';
import { ServableStatusIconComponent } from './components/servable-status-icon/servable-status-icon.component';

@NgModule({
  declarations: [
    ServablesTableComponent,
    ServableLogsComponent,
    ServableStatusIconComponent,
  ],
  entryComponents: [ServableLogsComponent],
  imports: [SharedModule],
  exports: [ServablesTableComponent, ServableStatusIconComponent],
})
export class ServablesModule {}
