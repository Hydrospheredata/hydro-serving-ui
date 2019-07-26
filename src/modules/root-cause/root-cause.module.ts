import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ExplanationComponent } from './containers';

import { RootCauseEffects } from './store/root-cause.effects';
import { RootCauseFacade } from './store/root-cause.facade';
import { reducer } from './store/root-cause.reducer';
@NgModule({
  entryComponents: [ExplanationComponent],
  declarations: [ExplanationComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('rootCause', reducer),
    EffectsModule.forFeature([RootCauseEffects]),
    SharedModule,
  ],
  providers: [RootCauseFacade],
  exports: [ExplanationComponent],
})
export class RootCauseModule {}
