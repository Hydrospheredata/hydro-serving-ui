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
    CheckServiceExistService
} from './services/_index';

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
    InputTextComponent,
    SelectComponent,
    LoaderComponent,
    NavbarComponent,
    SidebarComponent,
    ContentHeaderComponent
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
    RedirectToServicesGuard
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
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        // Components
        InputTextComponent,
        SelectComponent,
        SidebarComponent,
        ContentHeaderComponent
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
        CheckServiceExistService,
        // Builders
        ModelBuilder,
        ModelRuntimeBuilder,
        RuntimeTypeBuilder,
        ModelCurrentServicesBuilder,
        ModelBuildBuilder,
        ServiceBuilder,
        // Guards
        RedirectToServicesGuard
    ],
    exports: [
        // Pipes
        ModelStatusPipe,
        PositiveNumbersPipe,
        SearchPipe,
        SortByPipe,
        UtcToLocalPipe,
        // Components
        InputTextComponent,
        SelectComponent,
        SidebarComponent,
        ContentHeaderComponent
    ]
})
export class SharedModule { }
