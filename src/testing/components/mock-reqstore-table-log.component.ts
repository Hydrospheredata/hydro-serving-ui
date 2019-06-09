import { Component, Input } from '@angular/core';

@Component({
    selector: 'hs-reqstore-table-log',
    template: '',
})
export class ReqstoreTableLogComponent {
    @Input()
    modelVersion;

    @Input()
    logData: any;

    @Input()
    loading: any;
}
