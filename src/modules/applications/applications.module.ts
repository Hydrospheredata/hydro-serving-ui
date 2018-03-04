import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { ApplicationsRoutingModule } from './applications.router';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

// import { CodemirrorModule } from 'ng2-codemirror';

import {
    ApplicationsWrapperComponent,
    ApplicationsItemDetailComponent
} from './_index';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MdlModule,
        ApplicationsRoutingModule,
        FormsModule,
        ChartsModule
    ],
    declarations: [
        ApplicationsWrapperComponent,
        ApplicationsItemDetailComponent
    ]
})
export class ApplicationsModule { }
