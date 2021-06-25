import { NgModule } from '@angular/core';
import {
  D3LineComponent,
  D3AreaComponent,
  D3PlotBandComponent,
} from './components';
import { D3ThresholdComponent } from './components/threshold.component';
import { D3AxisDirective } from './directives';

const COMPONENTS = [
  D3LineComponent,
  D3AreaComponent,
  D3ThresholdComponent,
  D3PlotBandComponent,
];
const DIRECTIVES = [D3AxisDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES],
})
export class HsD3Module {}
