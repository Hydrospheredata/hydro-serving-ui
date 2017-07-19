import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HydroRouter } from '@app/app.router';


import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ModelsWrapperComponent } from '@components/models-wrapper/models-wrapper.component';
import { ModelsListComponent } from '@components/models-wrapper/models-list/models-list.component';

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
    FlexLayoutModule,
    HydroRouter
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
