import { Component, OnDestroy, AfterViewChecked } from '@angular/core';

import { Subscription } from 'rxjs';

import { LoaderStateService } from '@core/services';

import { LoaderState } from './loader';

@Component({
    selector: 'hydro-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements AfterViewChecked, OnDestroy {

    public show: boolean;

    private subscription: Subscription;

    constructor(
        private loaderStateService: LoaderStateService
    ) { }

    ngAfterViewChecked() {
        this.subscription = this.loaderStateService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
