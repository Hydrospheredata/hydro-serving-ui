import { NgModule } from '@angular/core';
import { D3LineComponent, D3AreaComponent } from './components';
import { D3AxisDirective } from './directives';

const COMPONENTS = [
    D3LineComponent,
    D3AreaComponent,
];
const DIRECTIVES = [
    D3AxisDirective,
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    exports: [
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
})
export class HsD3Module {}
