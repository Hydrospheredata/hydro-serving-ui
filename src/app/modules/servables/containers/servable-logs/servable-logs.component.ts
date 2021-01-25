import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LogService } from '@app/core/data/services/log.service';
@Component({
  selector: 'hs-servable-logs',
  templateUrl: './servable-logs.component.html',
  styleUrls: ['./servable-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServableLogsComponent implements OnInit {
  @Output() closed: EventEmitter<any> = new EventEmitter();

  logs$: Observable<string>;
  servableName: string;

  constructor(
    private logService: LogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.logs$ = this.logService
      .getLog('servable', this.servableName)
      .pipe(tap(() => this.cdr.detectChanges()));
  }

  onClose(): void {
    this.closed.emit();
  }
}
