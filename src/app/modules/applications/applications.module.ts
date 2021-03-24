import { NgModule } from '@angular/core';
import {
  ApplicationSignatureComponent,
  ApplicationFormComponent,
  ModelVariantFormComponent,
  KafkaFormComponent,
} from '@app/modules/applications/components';
import { UpdateModelVersionDirective } from '@app/modules/applications/directives';
import { ApplicationsPageComponent } from './pages/applications-page/applications-page.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ApplicationDetailsComponent } from './containers/application-details/application-details.component';

@NgModule({
  imports: [SharedModule, ApplicationsRoutingModule],
  declarations: [
    ApplicationsPageComponent,
    ApplicationDetailsComponent,
    ApplicationSignatureComponent,
    UpdateModelVersionDirective,
    ApplicationFormComponent,
    ModelVariantFormComponent,
    KafkaFormComponent
  ],
  entryComponents: [],
  providers: [],
  exports: [ApplicationFormComponent],
})
export class ApplicationsModule {}
