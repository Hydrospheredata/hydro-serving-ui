import { NgModule } from '@angular/core';
import { DeploymentConfigDetailsComponent } from './containers';
import { DeploymentConfigsPageComponent } from './pages';
import { SharedModule } from '@app/shared/shared.module';
import { DeploymentConfigsRoutingModule } from './deployment-configs-routing.module';
import { FormsModule } from '@angular/forms';
import { DcTreeComponent, DcTreeFieldComponent } from './components';
import { DcEditComponent } from './components/dc-tree/dc-edit/dc-edit.component';

@NgModule({
  entryComponents: [],
  declarations: [
    DeploymentConfigsPageComponent,
    DeploymentConfigDetailsComponent,
    DcTreeComponent,
    DcTreeFieldComponent,
    DcEditComponent,
  ],
  exports: [],
  imports: [SharedModule, DeploymentConfigsRoutingModule, FormsModule],
})
export class DeploymentConfigsModule {}
