import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ChartsModule } from 'ng2-charts';

import { ApplicationsRoutingModule } from './applications.router';
import { ApplicationsReducer } from '@applications/reducers/_index';
import { ApplicationsEffects } from '@applications/effects/_index';
import { ApplicationsWrapperComponent, ApplicationsItemDetailComponent, ApplicationsStageDetailComponent } from '@applications/components/_index';
import { ApplicationsService, ApplicationsBuilderService } from '@applications/services/_index';



@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MdlModule,
        ApplicationsRoutingModule,
        FormsModule,
        ChartsModule,
        StoreModule.forFeature('applications', ApplicationsReducer),
        EffectsModule.forFeature([ApplicationsEffects])
    ],
    declarations: [
        ApplicationsWrapperComponent,
        ApplicationsItemDetailComponent,
        ApplicationsStageDetailComponent
    ],
    providers: [ApplicationsService, ApplicationsBuilderService]
})
export class ApplicationsModule { }
