import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { SelectModule } from 'ng2-select';

// Pipes
import {
    SidebarFilterPipe,
    ModelStatusPipe,
    PositiveNumbersPipe,
    SearchPipe,
    SortByPipe,
    UtcToLocalPipe,
    IterateAsArrayPipe,
    RemoveDublicatesPipe,
    ToNumberPipe,
} from './pipes/_index';

// Components
import {
    InputTextComponent,
    HydroSelectComponent,
    TextareaComponent,
    SidebarComponent,
    ListInfoComponent,
    SignaturesComponent,
    IconComponent
} from './components/_index';

//Directives
import {
    ModelStatusDirective
} from './directives/_index';

@NgModule({
    imports: [
        MdlSelectModule,
        BrowserModule,
        CommonModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MomentModule,
        SelectModule,
    ],
    declarations: [
        // Pipes
        SidebarFilterPipe,
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        IterateAsArrayPipe,
        RemoveDublicatesPipe,
        ToNumberPipe,
        // Components
        InputTextComponent,
        TextareaComponent,
        HydroSelectComponent,
        SidebarComponent,
        ListInfoComponent,
        SignaturesComponent,
        IconComponent,
        // Directives
        ModelStatusDirective
    ],
    exports: [
        // Pipes
        SidebarFilterPipe,
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        IterateAsArrayPipe,
        RemoveDublicatesPipe,
        ToNumberPipe,
        // Components
        InputTextComponent,
        TextareaComponent,
        HydroSelectComponent,
        SidebarComponent,
        ListInfoComponent,
        SignaturesComponent,
        IconComponent,
        //Directives
        ModelStatusDirective
    ]
})
export class SharedModule { }
