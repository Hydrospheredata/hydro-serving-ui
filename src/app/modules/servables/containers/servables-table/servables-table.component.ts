import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Servable } from '@app/core/data/types';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import {
  DialogDeleteServableComponent,
  SERVABLE_NAME_TOKEN,
} from '@app/modules/dialogs/components/dialog-delete-servable/dialog-delete-servable.component';

@Component({
  selector: 'hs-servables-table',
  templateUrl: './servables-table.component.html',
  styleUrls: ['./servables-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServablesTableComponent {
  @Input()
  servables: Servable[];
  @Output() showedLog: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialogService: DialogsService) {}

  onDelete(servable: Servable): void {
    event.stopPropagation();

    this.dialogService.createDialog({
      component: DialogDeleteServableComponent,
      providers: [
        {
          provide: SERVABLE_NAME_TOKEN,
          useValue: servable.fullName,
        },
      ],
    });
  }

  onShowLog(servableName: string) {
    this.showedLog.next(servableName);
  }

  get isEmpty(): boolean {
    return this.servables && this.servables.length === 0;
  }
}
