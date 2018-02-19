import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { SourcesRoutingModule } from './sources.router';
import { FormsModule } from '@angular/forms';

import {
    SourcesWrapperComponent,
    SourcesItemDetailComponent
} from './_index';



@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MdlModule,
        SourcesRoutingModule,
        FormsModule,
    ],
    declarations: [
        SourcesWrapperComponent,
        SourcesItemDetailComponent
    ]
})
export class SourcesModule { }
