import { Component, OnInit, Input } from '@angular/core';
import { ReqstoreService } from '@core/services/reqstore.service';
import { decodeTsRecord, asServingReqRes } from '@shared/components/metrics/reqstore_format';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isArray } from 'util';
import { DialogService } from '@dialog/dialog.service';
import { DialogReqstoreComponent, REQSTORE_LOG$ } from '@shared/components/dialogs';

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

    @Input()
    private modelVersionId: number;

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

    getReqstoreData() {
            this.reqstore.getData(
                this.dateFrom$.getValue(),
                this.dateTo$.getValue()
            ).subscribe((_: any) => {
                const x = new Uint8Array(_);

                const y = decodeTsRecord(x);
                const descrR = [];

                y.forEach(function(v) {
                    const descrE = [];
                    const obj: any = {};
                    v.entries.forEach(function(x) {

                      obj.record = v.ts;

                      const reqRes = asServingReqRes(x.data);
                      const reqS = JSON.stringify(reqRes.req.toJSON());
                      const respS = JSON.stringify(reqRes.resp.toJSON());

                      obj.entry = x.uid;
                      obj.req = reqS;
                      obj.res = respS;
                      descrE.push(`\tEntry:${x.uid}`);
                      descrE.push(`\t\tReq:${reqS}`);
                      descrE.push(`\t\tResp:${respS}`);
                    });
                    descrR.push(obj);
                  });
                this.reqstoreLog$.next(descrR);
            });
    }

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
