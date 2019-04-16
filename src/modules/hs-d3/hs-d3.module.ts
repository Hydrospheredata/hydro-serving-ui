import { NgModule } from '@angular/core';
import { D3AxisDirective } from './directives';

const DIRECTIVES = [
    D3AxisDirective,
];

@NgModule({
    declarations: [
        ...DIRECTIVES,
    ],
    exports: [
        ...DIRECTIVES,
    ],
})
export class HsD3Module {}
