
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ITimeInterval } from '@shared/_index';

@Component({
    selector: 'hs-reqstore',
    templateUrl: './reqstore.component.html',
    styleUrls: ['./reqstore.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReqstoreComponent implements OnInit, AfterViewInit {
    timeInterval: ITimeInterval;

    constructor() {
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.initChart();
    }

    onChangeTimeInterval(timeInterval: ITimeInterval): void {
        this.timeInterval = timeInterval;
    }

    private initChart(): void {

    }

}
