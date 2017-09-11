import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// Services
import {
    HttpWeightedServicesService,
    BuildModelService,
    FormsService,
    HttpModelRuntimeService,
    HttpModelServiceService,
    HttpModelsService,
    HttpRuntimeTypesService,
    HttpService,
    LoaderStateService
} from './services/_index';

// Stores
import {
    WeightedServiceStore,
    ModelRuntimeStore,
    ModelServiceStore,
    ModelStore
} from './stores/_index';

// Pipes
import {
    ModelStatusPipe,
    PositiveNumbersPipe,
    SearchPipe,
    SortByPipe,
    UtcToLocalPipe
} from './pipes/_index';

import { InputTextComponent } from '../../components/form/input-text/input-text.component';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        MdlModule,
        FormsModule
    ],
    declarations: [
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        InputTextComponent
    ],
    providers: [
        // Services
        HttpWeightedServicesService,
        BuildModelService,
        FormsService,
        HttpModelRuntimeService,
        HttpModelServiceService,
        HttpModelsService,
        HttpRuntimeTypesService,
        HttpService,
        LoaderStateService,
        // Stores
        WeightedServiceStore,
        ModelRuntimeStore,
        ModelServiceStore,
        ModelStore
    ],
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
