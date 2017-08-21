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

import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ModelsWrapperComponent } from '@components/models-wrapper/models-wrapper.component';
import { ModelsListComponent } from '@components/models-wrapper/models-list/models-list.component';
import { SingleModelComponent } from './components/models-wrapper/models-list/single-model/single-model.component';
import { InputTextComponent } from './components/form/input-text/input-text.component';
import { LoaderComponent } from './components/loader/loader.component';

// pipes
import { SortByPipe } from '@pipes/sort-by.pipe';

// codemirror
import { CodemirrorModule } from 'ng2-codemirror';

// services
import { HttpModelsService } from '@services/http-models.service';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';
import { LoaderStateService } from '@services/loader-state.service';
import { HttpService } from '@services/http.service';

// stores
import { ModelStore } from '@stores/model.store';

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
import { DialogTestModelComponent } from './components/dialogs/dialog-test-model/dialog-test-model.component';
import { BuildModelService } from '@services/build-model.service';
import { DialogStopModelComponent } from './components/dialogs/dialog-stop-model/dialog-stop-model.component';
import { ModelStatusPipe } from './pipes/model-status.pipe';
import { UtcToLocalPipe } from './pipes/utc-to-local.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModelsWrapperComponent,
    ModelsListComponent,
    SingleModelComponent,
    DialogModelBuildComponent,
    InputTextComponent,
    DialogTestModelComponent,
    LoaderComponent,
    SortByPipe,
    DialogStopModelComponent,
    ModelStatusPipe,
    UtcToLocalPipe
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
    RouterModule
  ],
  entryComponents: [
    DialogModelBuildComponent,
    DialogTestModelComponent,
    DialogStopModelComponent
  ],
  providers: [
    // services
    HttpModelsService,
    BuildModelService,
    HttpRuntimeTypesService,
    // builders
    ModelBuilder,
    ModelRuntimeBuilder,
    RuntimeTypeBuilder,
    ModelCurrentServicesBuilder,
    ModelBuildBuilder,
    // stores
    ModelStore,
    HttpService,
    LoaderStateService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Location, LoaderStateService ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
