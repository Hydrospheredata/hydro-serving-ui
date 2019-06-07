import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAddReplyComponent } from './components/dialogs/dialog-add-reply/dialog-add-reply.component';
import { TimemachineComponent } from './containers/timemachine/timemachine.component';
import { TimemachineRoutingModule } from './timemachine-routing.module';

@NgModule({
  entryComponents: [DialogAddReplyComponent],
  declarations: [TimemachineComponent, DialogAddReplyComponent],
  imports: [
    CommonModule,
    TimemachineRoutingModule,
    ReactiveFormsModule,
    MdlModule,
    MdlSelectModule,
  ],
  exports: [TimemachineComponent, DialogAddReplyComponent],
})
export class TimemachineModule {}
