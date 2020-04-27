import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AddComparableComponent } from './model-versions-tags/add-comparable.component';
import { ModelVersionsTagsComponent } from './model-versions-tags/model-versions-tags.component';

@NgModule({
  imports: [SharedModule],
  entryComponents: [AddComparableComponent],
  declarations: [AddComparableComponent, ModelVersionsTagsComponent],
  exports: [ModelVersionsTagsComponent],
})
export class ModelsPublicUiModule {}
