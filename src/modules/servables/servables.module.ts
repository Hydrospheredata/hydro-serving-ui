import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import {
  ServablesTableComponent,
  ServableLogsComponent,
  DialogDeleteServableComponent,
} from './containers';
import { ServablesEffects } from './effects';
import { reducer } from './reducer';

const COMPONENTS = [
  ServablesTableComponent,
  ServableLogsComponent,
];
const DIALOGS = [
  DialogDeleteServableComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIALOGS,
  ],
  entryComponents: [
    ...DIALOGS,
    ServableLogsComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('servables', reducer),
    EffectsModule.forFeature([ServablesEffects]),
    SharedModule,
  ],
  exports: [
    ServablesTableComponent,
  ],
})
export class ServablesModule {}
