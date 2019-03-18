import { Component, InjectionToken, Inject } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { Observable } from 'rxjs';

export const REQSTORE_LOG$ = new InjectionToken<Observable<any>>('reqstoreLog');

@Component({
    templateUrl: './dialog-reqstore.component.html',
    styleUrls: ['./dialog-reqstore.component.scss'],
})

export class DialogReqstoreComponent {
    dateTimeFrom: Date;
    dateTimeTo: Date;

    constructor(
        public dialog: DialogService,
        @Inject(REQSTORE_LOG$) public reqstoreLog$: Observable<any>
    ) {
        this.reqstoreLog$.subscribe(_ => {
            this.dateTimeFrom = new Date(_[0].record * 1000);
            this.dateTimeTo = new Date(_[_.length - 1].record * 1000);
        });
    }

    onClose(): void {
        this.dialog.closeDialog();
    }
}
