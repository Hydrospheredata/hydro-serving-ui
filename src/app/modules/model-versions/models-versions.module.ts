import { NgModule } from '@angular/core';
import { ServablesModule } from '@app/modules/servables/servables.module';
import { SharedModule } from '@app/shared/shared.module';

import { ModelVersionsRowComponent } from './components/model-versions-row/model-versions-row.component';
import { ModelVersionsComponent } from './components/model-versions/model-versions.component';

@NgModule({
  exports: [ModelVersionsComponent],
  declarations: [ModelVersionsComponent, ModelVersionsRowComponent],
  imports: [SharedModule, ServablesModule],
})
export class ModelVersionsModule {}
