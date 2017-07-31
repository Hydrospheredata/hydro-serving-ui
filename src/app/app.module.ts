import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HydroRouter } from '@app/app.router';

import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ModelsWrapperComponent } from '@components/models-wrapper/models-wrapper.component';
import { ModelsListComponent } from '@components/models-wrapper/models-list/models-list.component';
import { SingleModelComponent } from './components/models-wrapper/models-list/single-model/single-model.component';

// services
import { HttpModelsService } from '@services/http-models.service';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';

// stores
import { ModelStore } from '@stores/model.store';

// builders
import { ModelBuilder } from '@builders/model.builder';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModelsWrapperComponent,
    ModelsListComponent,
    SingleModelComponent,
  ],
  imports: [
    BrowserModule,
    MdlModule,
    HttpModule,
    FlexLayoutModule,
    HydroRouter,
    MdlSelectModule
  ],
  providers: [HttpModelsService, HttpRuntimeTypesService, ModelBuilder, ModelStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
