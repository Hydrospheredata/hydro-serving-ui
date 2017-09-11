// Импорт зависимостей данного модуля.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { SharedModule } from '@shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServicesRoutingModule } from "./services.router";
import { SortByPipe } from '@shared/_index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Импорт страниц данного модуля.
import { 
    ServicesWrapperComponent, 
    ServicesSidebarComponent, 
    ServicesItemDetailComponent 
} from "./_index";



@NgModule({
    imports: [
        SharedModule,
        FlexLayoutModule,
        CommonModule,
        MdlModule,
        ServicesRoutingModule,
        FormsModule
    ],
    declarations: [
        ServicesWrapperComponent, 
        ServicesSidebarComponent,
        ServicesItemDetailComponent
    ]
})
export class ServicesModule { }
