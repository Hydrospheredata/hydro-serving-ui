import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'hs-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements AfterViewChecked, AfterViewInit {
  @Input() set logs(logs: string[]) {
    this.currentLogs = logs || [];
  }
  @ViewChild('logBody', { read: ElementRef }) logBody: ElementRef;
  @Input() header: string = 'Logs';
  @Input() error: string = '';

  @Output() closed: EventEmitter<any> = new EventEmitter<any>();

  currentLogs: string[] = [];
  autoScroll: boolean = true;

  ngAfterViewInit(): void {
    this.addScrollListener();
  }

  ngAfterViewChecked(): void {
    if (this.logBody && this.autoScroll) {
      this.scrollDown();
    }
  }

  get isEmptyLog(): boolean {
    return this.currentLogs.length === 0;
  }

  onClose(): void {
    this.closed.emit();
  }

  private scrollDown() {
    const el: HTMLElement = this.logBody.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  private addScrollListener(): void {
    const el: HTMLElement = this.logBody.nativeElement;
    el.addEventListener('scroll', () => {
      const { scrollHeight, scrollTop } = el;
      const { height } = el.getBoundingClientRect();
      const thisIsEnd = scrollTop === scrollHeight - height;

      this.autoScroll = thisIsEnd;
    });
  }
}
