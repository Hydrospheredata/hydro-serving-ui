import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterViewInit,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'hs-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsComponent
  implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
  @Input() logs$: Observable<string[]>;
  @Input() header: string = 'Logs';

  @Output() closed: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('logBody', { read: ElementRef, static: true }) logBody: ElementRef;
  autoScroll: boolean = true;

  logs: string[] = [];
  error: string = '';

  private destroy = new Subject();
  private logSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.logSubscription = this.logs$.pipe(takeUntil(this.destroy)).subscribe(
      val => {
        this.logs = val;
        this.cdr.detectChanges();
      },
      () => {
        this.error = `Internal error, stream was stopped`;
        this.cdr.detectChanges();
      }
    );
  }

  ngAfterViewInit(): void {
    this.addScrollListener();
  }

  ngAfterViewChecked(): void {
    if (this.logBody && this.autoScroll) {
      this.scrollDown();
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
    this.destroy = null;
    this.logSubscription.unsubscribe();
  }

  get isEmptyLog(): boolean {
    return this.logs.length === 0;
  }

  onClose(): void {
    this.closed.emit();
  }

  trackByFn(index) {
    return index;
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
      this.cdr.detectChanges();
    });
  }
}
