import {
    Component,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    HostListener,
    ViewEncapsulation,
} from '@angular/core';
import { DialogService } from './dialog.service';

import {
   group, state, trigger, style, transition, animate, animation, animateChild, query, AnimationEvent
} from '@angular/animations';

@Component({
    selector: 'hydro-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('openClose', [
          state('close', style({ height: 0, display: 'none'})),
          transition('close => open', [
              style({ height: '100%'}),
              query('.dialog__container', [
                  style({ opacity: 0, top: '-60px'}),
                  animate('.2s ease-in', style({ opacity: 1, top: 0})),
              ]),
          ]),
          transition('open => close', [
            group([
                query('.dialog__container', [
                    animate('.2s ease-in', style({ top: '60px'})),
                ]),
                animate('.2s',
                  style({ opacity: 0 })
                ),
            ]),
          ]),
        ]),
      ],
})
export class DialogComponent {
    @ViewChild('ancor', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    @ViewChild('container', {read: ElementRef})
    containerElRef: ElementRef;

    @ViewChild('layout')
    layoutRef: ElementRef;

    constructor(
        private dialog: DialogService
    ) {}

    @HostListener('document:keydown.escape')
    public onEsc(): void {
        this.dialog.closeDialog();
    }

    ngAfterViewInit() {
        this.dialog.setViewContainerRef(this.containerRef);
        this.dialog.setContainerElementRef(this.containerElRef);
    }

    onLayoutClick(e: Event): void {
        if (e.target === this.layoutRef.nativeElement) {
            this.dialog.closeDialog();
        }
    }

    onAnimationEvent(e: AnimationEvent) {
        if (e.toState === 'close') {
            this.dialog.clearContainer();
        }
    }
}
