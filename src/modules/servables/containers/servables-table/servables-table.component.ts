import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import {
  DialogDeleteServableComponent,
  SERVABLE_NAME_TOKEN,
} from '@servables/containers/dialogs';
import { Servable } from '../../models';
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

  constructor(private dialogService: DialogService) {}

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
