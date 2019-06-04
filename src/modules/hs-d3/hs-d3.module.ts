import { NgModule } from '@angular/core';
import { LineComponent } from './components';
import { D3AxisDirective } from './directives';

const COMPONENTS = [
    LineComponent,
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
