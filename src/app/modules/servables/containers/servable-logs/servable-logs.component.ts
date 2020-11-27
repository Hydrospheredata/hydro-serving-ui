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

import { ServableService } from '@app/core/data/services/servable.service';

@Component({
  selector: 'hs-servable-logs',
  templateUrl: './servable-logs.component.html',
  styleUrls: ['./servable-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServableLogsComponent implements OnInit {
  @Output() closed: EventEmitter<any> = new EventEmitter();

  logs$: Observable<string[]>;
  servableName: string;

  constructor(
    private servablesService: ServableService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.logs$ = this.servablesService
      .getLog(this.servableName)
      .pipe(tap(() => this.cdr.detectChanges()));
  }

  onClose(): void {
    this.closed.emit();
  }
}
