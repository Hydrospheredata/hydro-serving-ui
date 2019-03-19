import { Component, OnInit, Input } from '@angular/core';
import { ReqstoreService } from '@core/services/reqstore.service';
import { DialogService } from '@dialog/dialog.service';
import { DialogReqstoreComponent, REQSTORE_LOG$ } from '@shared/components/dialogs';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'hs-reqstore-select',
    templateUrl: './reqstore-select.component.html',
    styleUrls: ['./reqstore-select.component.scss'],
})
export class ReqstoreSelectComponent implements OnInit {
    @Input()
    set dateFrom(date: Date) {
        this.dateFrom$.next(date);
    }

    @Input()
    set dateTo(date: Date) {
        this.dateTo$.next(date);
    }

    dateFrom$: BehaviorSubject<Date> = new BehaviorSubject(null);
    dateTo$: BehaviorSubject<Date> = new BehaviorSubject(null);
    reqstoreLog$: BehaviorSubject<any> = new BehaviorSubject(null);

    isButtonDisabled$: Observable<boolean>;

    constructor(
        private reqstore: ReqstoreService,
        private dialog: DialogService
    ) {
        this.isButtonDisabled$ = combineLatest(this.dateFrom$, this.dateTo$).pipe(
            switchMap(([from, to]) => {
                if (from && to) {
                    return of(false);
                }

                return of(true);
            })
        );
    }

    ngOnInit(): void { }

    showReqstoreData() {
        this.dialog.createDialog({
            component: DialogReqstoreComponent,
            styles: {
                'max-width': 'calc(100vw - 40px)',
                'overflow': 'scroll',
            },
            providers: [{ provide: REQSTORE_LOG$, useValue: this.reqstoreLog$ }],
        });
    }
}
