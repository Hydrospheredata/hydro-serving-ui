import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from '@dialog/component/dialog.component';
import { DialogService } from '@dialog/dialog.service';

@NgModule({
    declarations: [DialogComponent],
    imports: [CommonModule],
    providers: [DialogService],
    exports: [DialogComponent],
})
export class DialogModule {}
