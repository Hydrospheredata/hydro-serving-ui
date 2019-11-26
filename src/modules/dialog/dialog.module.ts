import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from '@dialog/component/dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule],
  providers: [],
  exports: [DialogComponent],
})
export class DialogModule {}
