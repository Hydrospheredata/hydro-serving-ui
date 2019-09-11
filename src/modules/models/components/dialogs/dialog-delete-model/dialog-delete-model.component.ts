import { Component, InjectionToken, Inject } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { Model } from '@shared/_index';

export const SELECTED_MODEL = new InjectionToken<Model>('selected model');
@Component({
  selector: 'hydro-dialog-delete-model',
  templateUrl: './dialog-delete-model.component.html',
})
export class DialogDeleteModelComponent {
  get name(): string {
    return this.model.name;
  }

  constructor(
    public dialog: DialogService,
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
