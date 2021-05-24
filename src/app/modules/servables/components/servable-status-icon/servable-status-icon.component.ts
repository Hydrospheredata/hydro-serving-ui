import { Component, Input } from '@angular/core';
import { Servable, Status } from '@app/core/data/types';
import { LogsService } from '@app/modules/model-version/logs.service';

@Component({
  selector: 'hs-servable-status-icon',
  templateUrl: './servable-status-icon.component.html',
  styleUrls: ['./servable-status-icon.component.scss'],
})

export class ServableStatusIconComponent {
  @Input() servable: Servable;

  constructor(
    public logs: LogsService
  ) {}

  get status(): string {
    return this.servable.status;
  }

  get name(): string {
    return this.servable.name;
  }

  get message(): string {
    return this.servable.message;
  }

  get iconClass(): any {
    return {
      'servable-status--serving': this.status === Status.Serving,
      'servable-status--not-serving': this.status === Status.NotServing,
      'servable-status--starting': this.status === Status.Starting,
      'servable-status--unknown': this.status === Status.Undefined,
      'servable-status--serving--message': this.status === Status.Warning,
    };
  }

  public showServableLogs(name) {
    this.logs.showServableLogs(name);
  }
}
