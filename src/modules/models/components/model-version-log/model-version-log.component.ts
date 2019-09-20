import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'hs-model-version-log',
  templateUrl: './model-version-log.component.html',
  styleUrls: ['./model-version-log.component.scss'],
})
export class ModelVersionLogComponent implements OnInit, OnDestroy {
  @Input() modelVersion: number;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  logs$: Observable<string[]>;
  logs: string[] = [];
  error: string = '';
  private destroy = new Subject();
  private logSubscription: Subscription;

  constructor(
    private logService: ModelVersionLogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.logs$ = this.logService
      .getLog(this.modelVersion)
      .pipe(takeUntil(this.destroy));

    this.logSubscription = this.logs$.subscribe(
      val => {
        this.logs = val;
        this.cdr.detectChanges();
      },
      error => {
        this.error = `Iternal error, stream was stopped ${error}` ;
        this.cdr.detectChanges();
      }
    );
  }

  onClose() {
    this.closed.emit();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy = null;
    this.logSubscription.unsubscribe();
  }
}
