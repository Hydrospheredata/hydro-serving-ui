import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServablesService } from '../../services';

@Component({
  selector: 'hs-servable-logs',
  templateUrl: './servable-logs.component.html',
  styleUrls: ['./servable-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServableLogsComponent implements OnInit, OnDestroy {
  @Output() closed: EventEmitter<any> = new EventEmitter();
  logs$: Observable<string[]>;
  logs: string[] = [];
  servableName: string;
  error: string = '';

  destroy = new Subject();
  private logSubscription: Subscription;
  constructor(
    private servablesService: ServablesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.logs$ = this.servablesService
      .getLog(this.servableName)
      .pipe(takeUntil(this.destroy));
    this.logSubscription = this.logs$.subscribe(
      val => {
        this.logs = val;
        this.cdr.detectChanges();
      },
      () => {
        this.error = 'Iternal error, stream was stopped';
        this.cdr.detectChanges();
      }
    );
  }

  onClose(): void {
    this.closed.emit();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy = null;
    this.logSubscription.unsubscribe();
  }
}
