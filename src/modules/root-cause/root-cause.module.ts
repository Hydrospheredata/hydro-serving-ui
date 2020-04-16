import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {
  ExplanationDialogComponent,
  AnchorExplanationComponent,
  RiseExplanationComponent,
} from './containers';
import { ExplanationComponent } from './containers/explanation/explanation.component';

@NgModule({
  entryComponents: [ExplanationDialogComponent],
  declarations: [
    ExplanationDialogComponent,
    RiseExplanationComponent,
    AnchorExplanationComponent,
    ExplanationComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [ExplanationComponent]
})
export class RootCauseModule {}
