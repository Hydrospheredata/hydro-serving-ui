import { NgModule } from '@angular/core';

import {
  MetadataComponent,
  SignaturesComponent,
  ModelVersionLogComponent,
} from './components';
import { ServablesModule } from '@app/modules/servables/servables.module';

import { SharedModule } from '@app/shared/shared.module';

import { ModelVersionRoutingModule } from './model-version-routing.module';
import { ModelVersionPageComponent } from './page/model-version-page/model-version-page.component';
import {
  ModelVersionServicesComponent,
  ModelVersionDetailsComponent,
} from './containers';

@NgModule({
  entryComponents: [ModelVersionLogComponent],
  declarations: [
    ModelVersionPageComponent,
    ModelVersionDetailsComponent,
    MetadataComponent,
    ModelVersionServicesComponent,
    SignaturesComponent,
    ModelVersionLogComponent,
  ],
  imports: [SharedModule, ModelVersionRoutingModule, ServablesModule],
})
export class ModelVersionModule {}
