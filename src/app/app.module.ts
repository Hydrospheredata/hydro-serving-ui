import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { HydroRouter } from '@app/app.router';

// codemirror
import { CodemirrorModule } from 'ng2-codemirror';

// Global components
import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { LoaderComponent } from '@components/loader/loader.component';

// Modules
import { ServicesModule } from './modules/services/services.module';
import { ModelsModule } from './modules/models/models.module';
import { SharedModule } from './modules/shared/shared.module';

// Factories
import { httpServiceFactory } from './factories/http-service-factory';

import { 
  // Services
  HttpModelsService,
  HttpRuntimeTypesService,
  LoaderStateService,
  HttpService,
  HttpWeightedServicesService,
  HttpModelServiceService,
  BuildModelService,
  // Stores
  ModelStore,
  WeightedServiceStore,
  ModelServiceStore,
  ModelRuntimeStore,
  // Builders
  ModelBuilder,
  ModelRuntimeBuilder,
  ModelBuildBuilder,
  RuntimeTypeBuilder,
  ModelCurrentServicesBuilder
} from '@shared/_index';

// Dialogs
import { DialogModelBuildComponent } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import { DialogTestComponent } from '@components/dialogs/dialog-test/dialog-test.component';
import { DialogStopModelComponent } from '@components/dialogs/dialog-stop-model/dialog-stop-model.component';
import { DialogDeployModelComponent } from '@components/dialogs/dialog-deploy-model/dialog-deploy-model.component';
import { DialogUpdateServiceComponent } from '@components/dialogs/dialog-update-service/dialog-update-service.component';
import { DialogDeleteServiceComponent } from '@components/dialogs/dialog-delete-service/dialog-delete-service.component';
import { DialogAddServiceComponent } from '@components/dialogs/dialog-add-service.component/dialog-add-service.component';


import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoaderComponent,
    DialogModelBuildComponent,
    DialogTestComponent,
    DialogStopModelComponent,
    DialogDeployModelComponent,
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    DialogAddServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    HttpModule,
    FlexLayoutModule,
    HydroRouter,
    MdlSelectModule,
    MomentModule,
    CommonModule,
    CodemirrorModule,
    RouterModule,
    ServicesModule,
    ModelsModule,
    SharedModule,
    ClipboardModule
  ],
  entryComponents: [
    DialogModelBuildComponent,
    DialogTestComponent,
    DialogStopModelComponent,
    DialogDeployModelComponent,
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent,
    DialogAddServiceComponent
  ],
  providers: [
    // services
    HttpModelsService,
    BuildModelService,
    HttpRuntimeTypesService,
    HttpWeightedServicesService,
    HttpModelServiceService,
    // builders
    ModelBuilder,
    ModelRuntimeBuilder,
    RuntimeTypeBuilder,
    ModelCurrentServicesBuilder,
    ModelBuildBuilder,
    // stores
    ModelStore,
    WeightedServiceStore,
    ModelServiceStore,
    ModelRuntimeStore,
    HttpService,
    LoaderStateService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Location, LoaderStateService ]
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
