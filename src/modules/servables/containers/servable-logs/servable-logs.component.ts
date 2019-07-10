import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getLogs } from '../../actions';
import { ServablesService } from '../../services';
import { State } from '../../state';

@Component({
  selector: 'hs-servable-logs',
  templateUrl: './servable-logs.component.html',
  styleUrls: ['./servable-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServableLogsComponent implements OnInit {
  sub: Subscription;
  logs$: any;
  logStream$: any;
  servableName: string;

  constructor(
    private store: Store<State>,
    private servablesService: ServablesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.dispatch(getLogs());
    this.logs$ = this.servablesService.getLogs(this.servableName).pipe(
      tap(_ => this.cdr.detectChanges())
    );
  }
}
