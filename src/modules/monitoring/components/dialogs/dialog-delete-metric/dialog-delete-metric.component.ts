import { Component, InjectionToken, Inject } from '@angular/core';

import { DeleteMetricAction } from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { DialogService } from '@dialog/dialog.service';

export const METRIC_ID_VALUE = new InjectionToken<string>('metric id value');

@Component({
    templateUrl: './dialog-delete-metric.component.html',
})
export class DialogDeleteMetricComponent {

    constructor(
        @Inject(METRIC_ID_VALUE) public metricId: string,
        public dialog: DialogService,
        private store: Store<HydroServingState>
    ) {}

    public onClose(): void {
        this.dialog.closeDialog();
    }

    public onDelete() {
        this.store.dispatch(new DeleteMetricAction(this.metricId));
        this.onClose();
    }
}
