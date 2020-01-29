import { NgModule } from '@angular/core';
import { ApplicationsRoutingModule } from '@applications/applications.router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { CodemirrorModule } from 'ng2-codemirror';

import {
  ApplicationFormComponent,
  ApplicationsComponent,
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
import {
  ApplicationsService,
  ApplicationsGuard,
  ApplicationFormService,
} from '@applications/services';
import {
  reducer,
  ApplicationsEffects,
  ApplicationsFacade,
} from '@applications/store';
import { ApplicationBuilder } from '@core/builders/application.builder';
import { CustomValidatorsService } from '@core/services/custom-validators.service';
import {
  ApplicationsPageComponent,
  ApplicationPageComponent,
} from './containers';

const DIALOGS = [
  DialogDeleteApplicationComponent,
  DialogAddApplicationComponent,
  DialogUpdateApplicationComponent,
  DialogUpdateModelVersionComponent,
  DialogTestComponent,
];

const COMPONENTS = [
  ApplicationsPageComponent,
  ApplicationsComponent,
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
  ],
  entryComponents: [...DIALOGS],
  providers: [
    ApplicationsFacade,
    ApplicationsService,
    ApplicationBuilder,
    ApplicationsGuard,
    ApplicationFormService,
    CustomValidatorsService,
  ],
})
export class ApplicationsModule {}
