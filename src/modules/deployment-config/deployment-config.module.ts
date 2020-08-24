import { NgModule } from '@angular/core';
import { DeploymentConfigsEffects } from './store';
import { reducer } from './store';
import { EffectsModule } from '@node_modules/@ngrx/effects';
import { StoreModule } from '@node_modules/@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { DeploymentConfigPageComponent } from './containers';
import { DeploymentConfigsRoutingModule } from './deployment-configs-routing.module';
import {
  DeploymentConfigComponent,
  PodComponent,
  DeploymentConfigFormComponent,
  TolerationComponent,
  AffinityComponent,
  PodAffinityComponent,
  NodeAffinityComponent,
  PodAntiAffinityComponent,
  MatchFieldComponent,
  MatchExpressionComponent,
  NodeSelectorTermComponent,
  AffinityRequiredComponent,
  AffinityPreferredComponent,
} from './components';
import { AddConfigComponent } from './components/dialogs';
import { DcTreeComponent } from './components/deployment-config/components';
import { DcTreeFieldComponent } from './components/deployment-config/components';

@NgModule({
  entryComponents: [AddConfigComponent],
  declarations: [
    DeploymentConfigPageComponent,
    DeploymentConfigComponent,
    DeploymentConfigFormComponent,
    PodComponent,
    TolerationComponent,
    AffinityComponent,
    NodeAffinityComponent,
    PodAffinityComponent,
    PodAntiAffinityComponent,
    MatchExpressionComponent,
    MatchFieldComponent,
    NodeSelectorTermComponent,
    AffinityRequiredComponent,
    AffinityPreferredComponent,
    AddConfigComponent,
    DcTreeComponent,
    DcTreeFieldComponent,
  ],
  exports: [DeploymentConfigPageComponent],
  imports: [
    SharedModule,
    DeploymentConfigsRoutingModule,
    StoreModule.forFeature('deployment_configs', reducer),
    EffectsModule.forFeature([DeploymentConfigsEffects]),
  ],
})
export class DeploymentConfigModule {}
