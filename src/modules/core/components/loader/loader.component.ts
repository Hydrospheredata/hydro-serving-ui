import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { LoaderStateService } from '@core/services';

import { LoaderState } from './loader';

@Component({
    selector: 'hydro-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit, OnDestroy {

    public show: boolean;

    private subscription: Subscription;

    constructor(
        private loaderStateService: LoaderStateService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.subscription = this.loaderStateService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
                this.cdr.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
