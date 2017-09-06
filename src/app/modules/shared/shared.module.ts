import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ModelStatusPipe, PositiveNumbersPipe, SearchPipe, SortByPipe, UtcToLocalPipe } from './pipes/_index';
import { InputTextComponent } from '../../components/form/input-text/input-text.component';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [BrowserModule, CommonModule, MdlModule, FormsModule],
    declarations: [
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        InputTextComponent

    ],
    providers: [],
    exports: [
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        InputTextComponent
    ]
})
export class SharedModule { }
