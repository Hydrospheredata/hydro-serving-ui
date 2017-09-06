import { NgModule } from '@angular/core';
import { ModelsRoutingModule } from './models.router';
import { CommonModule, Location } from '@angular/common';
import { SortByPipe } from '@pipes/sort-by.pipe';


import { ModelsWrapperComponent } from './_index';
import { ModelsListComponent } from './_index';
import { SingleModelComponent } from './_index';
import { ModelDetailsComponent } from './_index';
import { ModelsSidebarComponent } from './_index';



@NgModule({
    imports: [
        ModelsRoutingModule,
        CommonModule
    ],
    declarations: [
        ModelsWrapperComponent,
        ModelsListComponent,
        SingleModelComponent,
        ModelDetailsComponent,
        ModelsSidebarComponent,
    ]
})
export class ModelsModule { }
