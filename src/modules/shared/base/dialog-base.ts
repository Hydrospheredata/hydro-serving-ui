import { Injectable, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';



@Injectable()
export class DialogBase {

    constructor(
        public dialogRef: MdlDialogReference
    ) {}

    @HostListener('document:keydown.escape')
    public onEsc(): void {
        this.dialogRef.hide();
    }

}
