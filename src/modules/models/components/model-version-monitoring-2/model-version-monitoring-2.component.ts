import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetMetricsAction } from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
    selector: 'hs-model-version-monitoring-2',
    templateUrl: './model-version-monitoring-2.component.html',
    styleUrls: ['model-version-monitoring-2.component.scss'],
})
export class ModelVersionMonitoring2Component implements OnInit, OnDestroy {
    private metricSubscription: Subscription;

    constructor(
        private store: Store<HydroServingState>
    ) {

    }

    ngOnInit(): void {
        this.metricSubscription = this.store.select(getSelectedModelVersion).pipe(
            filter(modelVersion => !!modelVersion),
            tap(({id}) => this.store.dispatch(new GetMetricsAction(`${id}`)))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.metricSubscription.unsubscribe();
    }
}
