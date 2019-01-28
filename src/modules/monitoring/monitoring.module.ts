import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MonitoringComponent } from './components';

const COMPONENTS = [
    MonitoringComponent,
];

@NgModule({
    declarations: [ MonitoringComponent ],
    imports: [ CommonModule,
        SharedModule,
        MdlModule,
        MdlSelectModule, ],
    providers: [],
})
export class MonitoringModule {}
