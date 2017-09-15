import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    LoaderStateService,
    ServicesService,
    ModelServicesService
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

// Components
import { 
    InputTextComponent
} from './components/_index';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        // Pipes
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        // Components
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
        ServicesService,
        ModelServicesService,
        // Stores
        WeightedServiceStore,
        ModelRuntimeStore,
        ModelServiceStore,
        ModelStore
    ],
    exports: [
        // Pipes
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        // Components
        InputTextComponent
    ]
})
export class SharedModule { }
