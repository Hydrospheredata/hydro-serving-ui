import { MdlSelectModule } from '@angular-mdl/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ChartsModule } from 'ng2-charts';

import { ApplicationsRoutingModule } from './applications.router';
import { reducers } from '@applications/reducers';
import { ApplicationsEffects } from '@applications/effects/_index';
import { ApplicationsWrapperComponent, ApplicationsItemDetailComponent, ApplicationsStageDetailComponent } from '@applications/components';
import { ApplicationsService, ApplicationsBuilderService, ApplicationsGuard } from '@applications/services';



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
        EffectsModule.forFeature([ApplicationsEffects])
    ],
    declarations: [
        ApplicationsWrapperComponent,
        ApplicationsItemDetailComponent,
        ApplicationsStageDetailComponent
    ],
    providers: [ApplicationsService, ApplicationsBuilderService, ApplicationsGuard]
})
export class ApplicationsModule { }
