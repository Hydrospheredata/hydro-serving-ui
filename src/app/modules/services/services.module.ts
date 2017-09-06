// Импорт зависимостей данного модуля.
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServicesRoutingModule } from "./services.router";

// Импорт страниц данного модуля.
import { ServicesWrapperComponent, ServicesListComponent } from "./_index";



@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        MdlModule,
        ServicesRoutingModule // настройки маршрутизации для модуля LandingModule
    ],
    declarations: [
        ServicesWrapperComponent, 
        ServicesListComponent
    ]
})
export class ServicesModule { }
