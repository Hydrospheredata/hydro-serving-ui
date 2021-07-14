import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import {
  AnchorExplanationComponent,
  RiseExplanationComponent,
} from './containers';
import { ExplanationButtonComponent } from './containers/explanation-button/explanation-button.component';

@NgModule({
  declarations: [
    RiseExplanationComponent,
    AnchorExplanationComponent,
    ExplanationButtonComponent,
  ],
  imports: [SharedModule],
  exports: [ExplanationButtonComponent, AnchorExplanationComponent],
})
export class RootCauseModule {}
