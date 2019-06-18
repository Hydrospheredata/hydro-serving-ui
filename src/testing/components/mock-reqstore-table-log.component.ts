import { Component, Input } from '@angular/core';

@Component({
    selector: 'hs-reqstore-table-log',
    template: '<div></div>',
})
export class MockReqstoreTableLogComponent {
    @Input()
    modelVersion;

    @Input()
    logData: any;

    @Input()
    loading: any;
}
