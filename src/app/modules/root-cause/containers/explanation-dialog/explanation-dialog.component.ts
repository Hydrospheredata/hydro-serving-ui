import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
} from '@angular/core';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { AnchorExplanation, AnchorExplanationResult } from '../../models';

export const EXPLANATION = new InjectionToken<AnchorExplanation>('explanation');

@Component({
  templateUrl: 'explanation-dialog.component.html',
  styleUrls: ['explanation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplanationDialogComponent {
  constructor(
    private dialogService: DialogsService,
    @Inject(EXPLANATION) public explanation: AnchorExplanationResult
  ) {}
  close() {
    this.dialogService.closeDialog();
  }
}
