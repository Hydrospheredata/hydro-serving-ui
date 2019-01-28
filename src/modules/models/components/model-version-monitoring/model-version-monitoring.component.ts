import { Component } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { DialogAddMetric2Component } from '@models/components/dialogs';

@Component({
    selector: 'hs-model-version-monitoring',
    templateUrl: './model-version-monitoring.component.html',
})
export class ModelVersionMonitoringComponent {
    constructor(
        private dialog: DialogService
    ) { }

    public openAddMetricDialog(): void {
        this.dialog.createDialog({
            component: DialogAddMetric2Component,
        });
    }
}
