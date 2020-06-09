import { NgModule } from '@angular/core';
import { ApplicationsRoutingModule } from '@applications/applications-routing.module';

import {
  ApplicationFormComponent,
  ApplicationsItemDetailComponent,
  DialogAddApplicationComponent,
  DialogDeleteApplicationComponent,
  DialogTestComponent,
  DialogUpdateApplicationComponent,
  DialogUpdateModelVersionComponent,
  KafkaFormComponent,
  ModelVariantFormComponent,
} from '@applications/components';

import { UpdateModelVersionDirective } from '@applications/directives';
import { ApplicationsService, ApplicationFormService } from '@applications/services';
import { reducer, ApplicationsEffects, ApplicationsFacade } from '@applications/store';
import { ApplicationBuilder } from '@core/builders/application.builder';
import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { CodemirrorModule } from 'ng2-codemirror';
import { ApplicationSignatureComponent } from './components/application-signature/application-signature.component';
import { ApplicationsPageComponent, ApplicationPageComponent } from './containers';

const DIALOGS = [
  DialogDeleteApplicationComponent,
  DialogAddApplicationComponent,
  DialogUpdateApplicationComponent,
  DialogUpdateModelVersionComponent,
  DialogTestComponent,
];

const COMPONENTS = [
  ApplicationsPageComponent,
  ApplicationsItemDetailComponent,
  ApplicationFormComponent,
  KafkaFormComponent,
  ModelVariantFormComponent,
];

const DIRECTIVES = [UpdateModelVersionDirective];
@NgModule({
  imports: [
    SharedModule,
    ApplicationsRoutingModule,
    ChartsModule,
    StoreModule.forFeature('applications', reducer),
    EffectsModule.forFeature([ApplicationsEffects]),
    CodemirrorModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...DIALOGS,
    ...DIRECTIVES,
    ApplicationPageComponent,
    ApplicationSignatureComponent,
  ],
  entryComponents: [...DIALOGS],
  providers: [
    ApplicationsFacade,
    ApplicationsService,
    ApplicationBuilder,
    ApplicationFormService,
    CustomValidatorsService,
  ],
})
export class ApplicationsModule {}
