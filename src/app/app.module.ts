import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HydroRouter } from '@app/app.router';
import { MomentModule } from 'angular2-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Global components
import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { LoaderComponent } from '@components/loader/loader.component';

// codemirror
import { CodemirrorModule } from 'ng2-codemirror';

// services
import { HttpModelsService } from '@services/http-models.service';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';
import { LoaderStateService } from '@services/loader-state.service';
import { HttpService } from '@services/http.service';
import { HttpWeightedServicesService } from '@services/http-weighted-services.service';
import { HttpModelServiceService } from '@services/http-model-service.service';

// stores
import { ModelStore } from '@stores/model.store';
import { WeightedServiceStore } from '@stores/weighted-service.store';
import { ModelServiceStore } from '@stores/model-service.store';
import { ModelRuntimeStore } from '@stores/model-runtime.store';

// factories
import { httpServiceFactory } from './factories/http-service-factory';

// builders
import { ModelBuilder } from '@builders/model.builder';
import { ModelRuntimeBuilder } from '@builders/model-runtime.builder';
import { ModelBuildBuilder } from '@builders/model-build.builder';
import { RuntimeTypeBuilder } from '@builders/runtime-type.builder';
import { ModelCurrentServicesBuilder } from '@builders/model-current-services.builder';

// dialogs
import { DialogModelBuildComponent } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import { DialogTestComponent } from './components/dialogs/dialog-test/dialog-test.component';
import { BuildModelService } from '@services/build-model.service';
import { DialogStopModelComponent } from './components/dialogs/dialog-stop-model/dialog-stop-model.component';
import { DialogDeployModelComponent } from './components/dialogs/dialog-deploy-model/dialog-deploy-model.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { DialogWeightedServiceComponent } from './components/dialogs/dialog-weighted-service/dialog-weighted-service.component';
import { DialogDeleteServiceComponent } from './components/dialogs/dialog-delete-service/dialog-delete-service.component';
import { ModelsSidebarComponent } from './components/models-sidebar/models-sidebar.component';
import { ModelDetailsComponent } from './components/model-details/model-details.component';

import { ServicesModule } from './modules/services/services.module';
import { ModelsModule } from './modules/models/models.module';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoaderComponent,
    DialogModelBuildComponent,
    DialogTestComponent,
    DialogStopModelComponent,
    DialogDeployModelComponent,
    ServicesListComponent,
    DialogWeightedServiceComponent,
    DialogDeleteServiceComponent
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
    SharedModule
  ],
  entryComponents: [
    DialogModelBuildComponent,
    DialogTestComponent,
    DialogStopModelComponent,
    DialogDeployModelComponent,
    DialogWeightedServiceComponent,
    DialogDeleteServiceComponent
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
