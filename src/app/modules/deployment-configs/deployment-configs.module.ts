import { NgModule } from '@angular/core';
import { DeploymentConfigDetailsComponent } from './containers';
import { DeploymentConfigsPageComponent } from './pages';
import { SharedModule } from '@app/shared/shared.module';
import { DeploymentConfigsRoutingModule } from './deployment-configs-routing.module';
import { DcTreeComponent, DcTreeFieldComponent } from './components';

@NgModule({
  entryComponents: [],
  declarations: [
    DeploymentConfigsPageComponent,
    DeploymentConfigDetailsComponent,
    DcTreeComponent,
    DcTreeFieldComponent,
  ],
  exports: [],
  imports: [SharedModule, DeploymentConfigsRoutingModule],
})
export class DeploymentConfigsModule {}
