// Импорт зависимостей данного модуля.
import { NgModule } from "@angular/core";
import { ModelsRoutingModule } from "./models.router";

// Импорт страниц данного модуля.
import { ModelsWrapperComponent } from "./_index";



@NgModule({
    imports: [
        ModelsRoutingModule // настройки маршрутизации для модуля LandingModule
    ],
    declarations: [
        ModelsWrapperComponent
    ]
})
export class ModelsModule { }
