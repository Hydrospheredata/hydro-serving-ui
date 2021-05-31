import { NgModule } from '@angular/core';
import { DeploymentConfigDetailsComponent } from './containers';
import { DeploymentConfigsPageComponent } from './pages';
import { SharedModule } from '@app/shared/shared.module';
import { DeploymentConfigsRoutingModule } from './deployment-configs-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DcTreeComponent, DcTreeFieldComponent } from './components';
import { DcFormComponent } from './components/dc-tree/dc-form/dc-form.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

@NgModule({
  entryComponents: [],
  declarations: [
    DeploymentConfigsPageComponent,
    DeploymentConfigDetailsComponent,
    DcTreeComponent,
    DcTreeFieldComponent,
    DcFormComponent,
  ],
  exports: [],
  imports: [
    SharedModule,
    DeploymentConfigsRoutingModule,
    ReactiveFormsModule,
    CodemirrorModule,
  ],
})
export class DeploymentConfigsModule {}
