import { MdlSelectModule } from '@angular-mdl/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ChartsModule } from 'ng2-charts';

import { CodemirrorModule } from 'ng2-codemirror' 
import { ApplicationsRoutingModule } from '@applications/applications.router';
import { reducers } from '@applications/reducers';
import { ApplicationsEffects } from '@applications/effects/_index';
import { 
    ApplicationsWrapperComponent, 
    ApplicationsItemDetailComponent, 
    ApplicationsStageDetailComponent, 
    ApplicationsDialogComponent, 
    ApplicationFormComponent,
    KafkaFormComponent,
    ServiceFormComponent
} from '@applications/components';
import { 
    ApplicationsService, 
    ApplicationsBuilderService, 
    ApplicationsGuard,
    ApplicationFormService
} from '@applications/services';
import { CustomValidatorsService } from '@core/services/custom-validators.service';

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
        CodemirrorModule
    ],
    declarations: [
        ApplicationsWrapperComponent,
        ApplicationsItemDetailComponent,
        ApplicationsStageDetailComponent,
        ApplicationsDialogComponent, 
        ApplicationFormComponent,
        KafkaFormComponent,
        ServiceFormComponent
    ],
    providers: [
        ApplicationsService, 
        ApplicationsBuilderService, 
        ApplicationsGuard, 
        ApplicationFormService, 
        CustomValidatorsService
    ],
    exports: [ApplicationsDialogComponent, ApplicationFormComponent]
})
export class ApplicationsModule { }
