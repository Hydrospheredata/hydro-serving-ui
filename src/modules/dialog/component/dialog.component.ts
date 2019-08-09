import {
  Component,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { DialogService } from '../dialog.service';

import {
  group,
  state,
  trigger,
  style,
  transition,
  animate,
  query,
  AnimationEvent,
} from '@angular/animations';

@Component({
  selector: 'hydro-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('openClose', [
      state('close', style({ transform: 'scale(0)', display: 'none' })),
      transition('close => open', [
        style({ transform: 'scale(1)', display: 'flex' }),
        query('.dialog__container', [
          style({ opacity: 0, top: '-60px' }),
          animate('.2s ease-in', style({ opacity: 1, top: 0 })),
        ]),
      ]),
      transition('open => close', [
        group([
          query('.dialog__container', [
            animate('.2s ease-in', style({ top: '60px' })),
          ]),
          animate('.2s', style({ opacity: 0 })),
        ]),
      ]),
    ]),
  ],
})
export class DialogComponent implements OnInit {
  @ViewChild('ancor', { read: ViewContainerRef })
  containerRef: ViewContainerRef;

  @ViewChild('container', { read: ElementRef })
  containerElRef: ElementRef;

  @ViewChild('layout')
  layoutRef: ElementRef;

  public isAnimationDisabled: boolean = false;

  constructor(public dialog: DialogService) {}

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.dialog.closeDialog();
  }

  ngOnInit(): void {
    this.dialog.setViewContainerRef(this.containerRef);
    this.dialog.setContainerElementRef(this.containerElRef);
  }

  onLayoutClick(e: Event): void {
    if (e.target === this.layoutRef.nativeElement) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialog.closeDialog();
  }

  onAnimationEvent(e: AnimationEvent): void {
    if (e.fromState === 'open' && e.toState === 'close') {
      this.dialog.clearContainer();
    }
  }
}
