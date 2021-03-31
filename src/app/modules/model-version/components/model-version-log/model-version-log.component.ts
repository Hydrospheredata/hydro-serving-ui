import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { LogService } from '@app/core/data/services/log.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'hs-model-version-log',
  templateUrl: './model-version-log.component.html',
  styleUrls: ['./model-version-log.component.scss'],
  providers: [LogService],
})
export class ModelVersionLogComponent implements OnInit {
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Input() modelVersion: number;

  logs$: Observable<string>;

  constructor(
    private logService: LogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.logs$ = this.logService
      .getLog('model-version', this.modelVersion.toString())
      .pipe(tap(() => this.cdr.detectChanges()));
  }

  onClose() {
    this.closed.emit();
  }
}
