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
  C.ExplanationDialogComponent,
];

import { MetricSpecConfigComponent } from './components/dialog-metric/metric-spec-config/metric-spec-config.component';
import { RootCauseModule } from '@app/modules/root-cause/root-cause.module';

@NgModule({
  entryComponents: [...DIALOGS],
  declarations: [...DIALOGS, DialogComponent, MetricSpecConfigComponent],
  imports: [
    SharedModule,
    ApplicationsModule,
    CodemirrorModule,
    RootCauseModule,
  ],
  exports: [DialogComponent],
})
export class DialogsModule {}
