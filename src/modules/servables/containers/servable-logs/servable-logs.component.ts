import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServablesService } from '../../services';

@Component({
  selector: 'hs-servable-logs',
  templateUrl: './servable-logs.component.html',
  styleUrls: ['./servable-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServableLogsComponent implements OnInit {
  @Output() closed: EventEmitter<any> = new EventEmitter();
  sub: Subscription;
  logs$: any;
  logStream$: any;
  servableName: string;
  error: string = '';

  constructor(
    private servablesService: ServablesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.logs$ = this.servablesService
      .getLogs(this.servableName)
      .pipe(tap(_ => this.cdr.detectChanges()));
  }

  onClose(): void {
    this.closed.emit();
  }
}
