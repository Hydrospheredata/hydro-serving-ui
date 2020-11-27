import { Component, InjectionToken, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { DialogsService } from '../../dialogs.service';

import { deleteServable } from '@app/core/store/actions/servables.actions';
import { State } from '@app/core/store/states/servables.state';

export const SERVABLE_NAME_TOKEN = new InjectionToken('servable full name');

@Component({
  templateUrl: './dialog-delete-servable.component.html',
  styleUrls: ['./dialog-delete-servable.component.scss'],
})
export class DialogDeleteServableComponent {
  servableName: string;
  constructor(
    private dialogService: DialogsService,
    @Inject(SERVABLE_NAME_TOKEN) servableName: string,
    private store: Store<State>
  ) {
    this.servableName = servableName;
  }

  onDelete() {
    this.store.dispatch(deleteServable({ name: this.servableName }));
    this.onClose();
  }
  onClose() {
    this.dialogService.closeDialog();
  }
}
