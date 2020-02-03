import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { ZenModeService } from '@core/services/zenmode.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hsHideInZenMode]',
})
export class HideInZenModeDirective implements OnDestroy {
  private subscription: Subscription;
  constructor(private zenMode: ZenModeService, el: ElementRef) {
    this.subscription = this.zenMode.isZenMode$.subscribe(
      isZenMode => ((el.nativeElement as HTMLElement).hidden = isZenMode)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
