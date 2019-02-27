import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsRoutingModule } from '@applications/applications.router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { CodemirrorModule } from 'ng2-codemirror';

import { ApplicationsEffects } from '@applications/effects/_index';
import { reducers } from '@applications/reducers';

import {
    ApplicationsWrapperComponent,
    ApplicationsItemDetailComponent,
    ApplicationFormComponent,
    KafkaFormComponent,
    ModelVariantFormComponent,
    DialogAddApplicationComponent,
    DialogDeleteApplicationComponent,
    DialogTestComponent,
    DialogUpdateApplicationComponent,
    DialogUpdateModelVersionComponent
} from '@applications/components';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateModelVersionDirective } from '@applications/directives';
import {
    ApplicationsService,
    ApplicationsGuard,
    ApplicationFormService
} from '@applications/services';
import { ApplicationBuilder } from '@core/builders/application.builder';
import { CustomValidatorsService } from '@core/services/custom-validators.service';

const DIALOGS = [
    DialogDeleteApplicationComponent,
    DialogAddApplicationComponent,
    DialogUpdateApplicationComponent,
    DialogUpdateModelVersionComponent,
    DialogTestComponent,
];

const PRIVATE_COMPONENTS = [
    ApplicationsWrapperComponent,
    ApplicationsItemDetailComponent,
    ApplicationFormComponent,
    KafkaFormComponent,
    ModelVariantFormComponent,
];

const DIRECTIVES = [
    UpdateModelVersionDirective,
];
@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MdlModule,
        MdlSelectModule,
        ApplicationsRoutingModule,
        FormsModule,
        ChartsModule,
        StoreModule.forFeature('applications', reducers),
        EffectsModule.forFeature([ApplicationsEffects]),
        ReactiveFormsModule,
        CodemirrorModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        ...PRIVATE_COMPONENTS,
        ...DIALOGS,
        ...DIRECTIVES,
    ],
    entryComponents: [
        ...DIALOGS,
    ],
    providers: [
        ApplicationsService,
        ApplicationBuilder,
        ApplicationsGuard,
        ApplicationFormService,
        CustomValidatorsService,
    ],
})
export class ApplicationsModule { }
