import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { ZenModeService } from '@app/core/zenmode.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hsShowInZenMode]',
})
export class ShowInZenModeDirective implements OnDestroy {
  private subscription: Subscription;
  constructor(private zenMode: ZenModeService, el: ElementRef) {
    this.subscription = this.zenMode.isZenMode$.subscribe(
      isZenMode => ((el.nativeElement as HTMLElement).hidden = !isZenMode)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
