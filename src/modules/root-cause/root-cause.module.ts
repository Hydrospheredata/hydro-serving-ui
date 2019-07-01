import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ExplanationComponent } from './containers';
import { RootCauseEffects } from './effects/root-cause.effects';
import { reducer } from './reducer';
@NgModule({
  entryComponents: [ExplanationComponent],
  declarations: [ExplanationComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('rootCause', reducer),
    EffectsModule.forFeature([RootCauseEffects]),
    SharedModule,
  ],
  exports: [ExplanationComponent],
})
export class RootCauseModule {}
