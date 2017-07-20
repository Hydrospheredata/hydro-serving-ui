import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HydroRouter } from '@app/app.router';


import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ModelsWrapperComponent } from '@components/models-wrapper/models-wrapper.component';
import { ModelsListComponent } from '@components/models-wrapper/models-list/models-list.component';

// services
import { HttpModelsService } from '@services/http-models.service';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModelsWrapperComponent,
    ModelsListComponent
  ],
  imports: [
    BrowserModule,
    MdlModule,
    HttpModule,
    FlexLayoutModule,
    HydroRouter
  ],
  providers: [HttpModelsService, HttpRuntimeTypesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
