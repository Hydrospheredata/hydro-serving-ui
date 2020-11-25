import { NgModule } from '@angular/core';
import { ModelVersionsModule } from '@app/modules/model-versions/models-versions.module';
import { SharedModule } from '@app/shared/shared.module';

import { ModelDetailsComponent } from './containers/model-details/model-details.component';
import { ModelsHeaderZenModeComponent } from './layout/models-header/models-header-zen-mode/models-header-zen-mode.component';
import { ModelsHeaderComponent } from './layout/models-header/models-header.component';
import { ModelsRoutingModule } from './models-routing.module';
import { ModelsPageComponent } from './page/models-page.component';

@NgModule({
  entryComponents: [],
  declarations: [
    ModelsPageComponent,
    ModelDetailsComponent,
    ModelsHeaderComponent,
    ModelsHeaderZenModeComponent,
  ],
  imports: [SharedModule, ModelVersionsModule, ModelsRoutingModule],
})
export class ModelsModule {}
