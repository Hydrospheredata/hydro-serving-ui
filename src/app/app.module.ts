import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { routing } from '@app/app.router';


import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ModelsWrapperComponent } from '@components/models-wrapper/models-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModelsWrapperComponent
  ],
  imports: [
    BrowserModule,
    MdlModule,
    FlexLayoutModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
