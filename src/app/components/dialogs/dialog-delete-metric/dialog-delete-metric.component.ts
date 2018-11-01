import { DeleteMetricAction } from '@core/actions/monitoring.actions';
import { Component, InjectionToken, Inject } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { Store } from '@ngrx/store';

import { DialogBase } from '@shared/base/_index';
// import { DeleteApplicationAction } from '@applications/actions/applications.actions';
import { HydroServingState } from '@core/reducers';


export const METRIC_ID_VALUE = new InjectionToken<string>('metric id value');


@Component({
    selector: 'hydro-dialog-delete-metric',
    templateUrl: './dialog-delete-metric.component.html',
    styleUrls: ['./dialog-delete-metric.component.scss']
})
export class DialogDeleteMetricComponent extends DialogBase {

    constructor(
        @Inject(METRIC_ID_VALUE) public metricId: string,
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );
    }

    public onDelete() {
        console.log(`deleting ${this.metricId}`);
        this.store.dispatch(new DeleteMetricAction(this.metricId));
        this.dialogRef.hide();
    }

}
