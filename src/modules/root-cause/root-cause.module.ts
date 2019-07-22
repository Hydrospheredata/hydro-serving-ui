import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RootCauseFacade } from '@rootcause/state/root-cause.facade';
import { SharedModule } from '@shared/shared.module';
import { ExplanationComponent } from './containers';
import { RootCauseEffects } from './state/root-cause.effects';
import { reducer } from './state/root-cause.reducer';
@NgModule({
  entryComponents: [ExplanationComponent],
  declarations: [ExplanationComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('rootCause', reducer),
    EffectsModule.forFeature([RootCauseEffects]),
    SharedModule,
  ],
  providers: [ RootCauseFacade ],
  exports: [ExplanationComponent],
})
export class RootCauseModule {}
