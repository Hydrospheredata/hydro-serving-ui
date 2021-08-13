import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsLineComponent } from '@app/modules/code-snippet/components/cs-line/cs-line.component';
import { CsContainerComponent } from '@app/modules/code-snippet/containers/cs-container/cs-container.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [CsContainerComponent, CsLineComponent],
  imports: [CommonModule, SharedModule],
  exports: [CsContainerComponent],
})
export class CodeSnippetModule {}
