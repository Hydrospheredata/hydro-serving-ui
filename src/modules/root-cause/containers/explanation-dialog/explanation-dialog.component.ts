import {ChangeDetectionStrategy, Component, Inject, InjectionToken,} from '@angular/core';
import {DialogService} from '@dialog/dialog.service';
import {AnchorExplanation, AnchorExplanationResult} from '@rootcause/models';

export const EXPLANATION = new InjectionToken<AnchorExplanation>('explanation');

@Component({
  templateUrl: 'explanation-dialog.component.html',
  styleUrls: ['explanation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplanationDialogComponent {
  constructor(
    private dialogService: DialogService,
    @Inject(EXPLANATION) public explanation: AnchorExplanationResult,
  ) {
  }
  close() {
    this.dialogService.closeDialog();
  }
}
