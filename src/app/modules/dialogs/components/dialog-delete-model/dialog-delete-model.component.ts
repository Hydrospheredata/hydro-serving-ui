import { Component, InjectionToken, Inject } from '@angular/core';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { Model } from '@app/core/data/types';

export const SELECTED_MODEL = new InjectionToken<Model>('selected model');

@Component({
  selector: 'hs-dialog-delete-model',
  templateUrl: './dialog-delete-model.component.html',
})
export class DialogDeleteModelComponent {
  get name(): string {
    return this.model.name;
  }

  constructor(
    public dialog: DialogsService,
    private modelsFacade: ModelsFacade,
    @Inject(SELECTED_MODEL) private model: Model
  ) {}

  onClose(): void {
    this.dialog.closeDialog();
  }

  onDelete(): void {
    this.modelsFacade.deleteModel(this.model.id);
    this.onClose();
  }
}
