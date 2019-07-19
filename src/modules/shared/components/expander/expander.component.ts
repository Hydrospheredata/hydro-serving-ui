import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChild,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: '[hs-expander]',
  templateUrl: 'expander.component.html',
  styleUrls: ['expander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpanderComponent implements AfterViewInit, OnDestroy {
  @Input() maxHeight: number = 60;
  @ViewChild('expandButton', { read: ElementRef }) expandButtonRef: ElementRef;
  @ContentChild('expand') aRef: ElementRef;
  expanded: boolean = false;
  expandable: boolean = false;

  private destroy$ = new Subject();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.expandable = this.contentHeightOverMaxHeight();

    fromEvent(this.expandButtonRef.nativeElement, 'click')
      .pipe(
        tap(() => {
          this.toggleExpand();
          this.cdr.detectChanges();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.cdr.detectChanges();
  }

  getMaxHeight(): string {
    return this.expanded ? 'initial' : `${this.maxHeight}px`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$ = null;
  }

  // TODO: ADD ICON-ARROW
  get buttonTitle(): string {
    return this.expanded ? 'Shrink' : 'Expand';
  }

  private toggleExpand(): void {
    this.expanded = !this.expanded;
  }
  private contentHeightOverMaxHeight(): boolean {
    const el: HTMLElement = this.aRef.nativeElement;
    const height = el.getBoundingClientRect().height;
    return height >= this.maxHeight;
  }
}
