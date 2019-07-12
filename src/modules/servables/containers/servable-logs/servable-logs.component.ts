import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { ServablesService } from '../../services';

@Component({
  selector: 'hs-servable-logs',
  templateUrl: './servable-logs.component.html',
  styleUrls: ['./servable-logs.component.scss'],
})
export class ServableLogsComponent implements OnInit, OnDestroy {
  @Output() closed: EventEmitter<any> = new EventEmitter();
  sub: Subscription;
  logs$: any;
  servableName: string;
  error: string = '';

  destroy = new Subject();
  constructor(private servablesService: ServablesService) {}

  ngOnInit() {
    this.logs$ = this.servablesService.getLog(this.servableName).pipe(
      takeUntil(this.destroy),
      catchError(_ => {
        this.error = 'No logs available';
        return of([]);
      })
    );
  }

  onClose(): void {
    this.closed.emit();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy = null;
  }
}
