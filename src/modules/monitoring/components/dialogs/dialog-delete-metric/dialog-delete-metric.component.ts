import {
  Component,
  InjectionToken,
  Inject,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { DeleteMetricAction } from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { DialogService } from '@dialog/dialog.service';

export const METRIC_ID_VALUE = new InjectionToken<string>('metric id value');

@Component({
  templateUrl: 'dialog-delete-metric.component.html',
  styleUrls: ['dialog-delete-metric.component.scss'],
})
export class DialogDeleteMetricComponent {
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Input() metricId: string;
  constructor(
    public dialog: DialogService,
    private store: Store<HydroServingState>
  ) {}

  public onClose(): void {
    this.closed.next();
  }

  public onDelete() {
    this.store.dispatch(new DeleteMetricAction(this.metricId));
    this.closed.next();
  }
}
