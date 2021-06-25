import {
  AfterViewInit,
  Component,
  HostListener,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LogsService } from '@app/modules/model-version/logs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements AfterViewInit {
  @ViewChild('logContainer', { read: ViewContainerRef })
  logContainer: ViewContainerRef;
  isVisible$: Observable<boolean>;

  constructor(private readonly logs: LogsService) {
    this.isVisible$ = logs.logIsVisible$;
  }

  ngAfterViewInit() {
    this.logs.setViewContainerRef(this.logContainer);
  }

  public closeGlobalLog(): void {
    this.logs.closeGlobalLog();
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.logs.closeGlobalLog();
  }
}
