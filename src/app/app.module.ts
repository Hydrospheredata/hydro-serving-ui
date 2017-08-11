import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HydroRouter } from '@app/app.router';
import { MomentModule } from 'angular2-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ModelsWrapperComponent } from '@components/models-wrapper/models-wrapper.component';
import { ModelsListComponent } from '@components/models-wrapper/models-list/models-list.component';
import { SingleModelComponent } from './components/models-wrapper/models-list/single-model/single-model.component';
import { InputTextComponent } from './components/form/input-text/input-text.component';

// services
import { HttpModelsService } from '@services/http-models.service';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';

// stores
import { ModelStore } from '@stores/model.store';

// builders
import { ModelBuilder } from '@builders/model.builder';
import { ModelRuntimeBuilder } from '@builders/model-runtime.builder';
import { ModelBuildBuilder } from '@builders/model-build.builder';
import { RuntimeTypeBuilder } from '@builders/runtime-type.builder';

// dialogs
import { DialogModelBuildComponent } from '@components/dialogs/dialog-model-build/dialog-model-build.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModelsWrapperComponent,
    ModelsListComponent,
    SingleModelComponent,
    DialogModelBuildComponent,
    InputTextComponent
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
    CommonModule
  ],
  entryComponents: [
    DialogModelBuildComponent
  ],
  providers: [
    // services
    HttpModelsService,
    HttpRuntimeTypesService,
    // builders
    ModelBuilder,
    ModelRuntimeBuilder,
    RuntimeTypeBuilder,
    ModelBuildBuilder,
    // stores
    ModelStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
