import { NgModule } from '@angular/core';
import { ApplicationsModule } from '@app/modules/applications/applications.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SharedModule } from '@app/shared/shared.module';

import { DialogComponent } from './containers';
import * as C from './components';

const DIALOGS = [
  C.DialogDeleteModelComponent,
  C.DialogDeleteApplicationComponent,
  C.DialogAddApplicationComponent,
  C.DialogTestComponent,
  C.DialogUpdateApplicationComponent,
  C.DialogUpdateModelVersionComponent,
  C.DialogDeleteServableComponent,
  C.DialogDeleteDeploymentConfigComponent,
  C.DialogDeleteMetricComponent,
  C.DialogMetricComponent,
  C.DialogMetricsComponent,
  C.DialogRequestsErrorsComponent,
  C.BuildInformationDialogComponent,
];

import { MetricSpecConfigComponent } from './components/dialog-metric/metric-spec-config/metric-spec-config.component';

@NgModule({
  entryComponents: [...DIALOGS],
  declarations: [...DIALOGS, DialogComponent, MetricSpecConfigComponent],
  imports: [SharedModule, ApplicationsModule, CodemirrorModule],
  exports: [DialogComponent],
})
export class DialogsModule {}
