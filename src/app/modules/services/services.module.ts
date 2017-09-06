// Импорт зависимостей данного модуля.
import { NgModule } from "@angular/core";
import { ServicesRoutingModule } from "./services.router";

// Импорт страниц данного модуля.
import { ServicesWrapperComponent, ServicesListComponent } from "./_index";



@NgModule({
    imports: [
        ServicesRoutingModule // настройки маршрутизации для модуля LandingModule
    ],
    declarations: [
        ServicesWrapperComponent, 
        ServicesListComponent
    ]
})
export class ServicesModule { }
