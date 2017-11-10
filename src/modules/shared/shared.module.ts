import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { SelectModule } from 'ng2-select';

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
    ModelsService,
    ModelRuntimesService,
    ModelServicesService,
    ServicesRouterResolver
} from './services/_index';

// Pipes
import {
    ModelFilterPipe,
    ModelStatusPipe,
    PositiveNumbersPipe,
    SearchPipe,
    SortByPipe,
    UtcToLocalPipe,
    IterateAsArrayPipe,
    RemoveDublicatesPipe
} from './pipes/_index';

// Components
import {
    // Forms
    InputTextComponent,
    SelectComponent,
    TextareaComponent,

    LoaderComponent,
    NavbarComponent,
    SidebarComponent,
    DialogBaseComponent
} from './components/_index';

// Builders
import {
  ModelBuilder,
  ModelRuntimeBuilder,
  RuntimeTypeBuilder,
  ModelCurrentServicesBuilder,
  ModelBuildBuilder,
  ServiceBuilder,
} from './builders/_index';

// Guards
import {
    ServicesGuard
} from './guards/_index';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        MdlModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MomentModule,
        SelectModule
    ],
    declarations: [
        // Pipes
        ModelFilterPipe,
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        IterateAsArrayPipe,
        RemoveDublicatesPipe,
        // Components
        InputTextComponent,
        TextareaComponent,
        SelectComponent,
        SidebarComponent,
        DialogBaseComponent
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
        ModelRuntimesService,
        ModelsService,
        ModelServicesService,
        ServicesRouterResolver,
        // Builders
        ModelBuilder,
        ModelRuntimeBuilder,
        RuntimeTypeBuilder,
        ModelCurrentServicesBuilder,
        ModelBuildBuilder,
        ServiceBuilder,
        // Guards
        ServicesGuard
    ],
    exports: [
        // Pipes
        ModelFilterPipe,
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        IterateAsArrayPipe,
        RemoveDublicatesPipe,
        // Components
        InputTextComponent,
        TextareaComponent,
        SelectComponent,
        SidebarComponent,
        DialogBaseComponent
    ]
})
export class SharedModule { }
