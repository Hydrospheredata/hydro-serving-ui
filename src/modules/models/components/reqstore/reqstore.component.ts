
import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ITimeInterval } from '@shared/_index';

@Component({
    selector: 'hs-reqstore',
    templateUrl: './reqstore.component.html',
    styleUrls: ['./reqstore.component.scss'],
})
export class ReqstoreComponent implements OnInit, AfterViewInit {
    timeInterval: ITimeInterval;

    constructor(
       public cd: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
    }

    onChangeTimeInterval(timeInterval: ITimeInterval): void {
        this.timeInterval = timeInterval;
    }
}
