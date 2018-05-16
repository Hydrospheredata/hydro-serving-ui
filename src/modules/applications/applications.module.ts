import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { ApplicationsRoutingModule } from './applications.router';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { ApplicationsWrapperComponent, ApplicationsItemDetailComponent } from './_index';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationsEffects } from '@applications/effects/_index';
import { ApplicationsService, ApplicationsBuilderService } from '@applications/services/_index';
import { ApplicationsReducer } from '@applications/reducers/_index';
import { StoreModule } from '@ngrx/store';

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
        ApplicationsItemDetailComponent
    ],
    providers: [ApplicationsService, ApplicationsBuilderService]
})
export class ApplicationsModule { }
