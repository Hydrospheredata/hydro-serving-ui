import { Component, ElementRef, ViewChild } from '@angular/core';
import { ZenModeService } from '@app/core/zenmode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('trigger') trigger: ElementRef;
  isSidebarOpened = false;
  isZenMode$: Observable<boolean> = this.zenMode.isZenMode$;
  constructor(private zenMode: ZenModeService) {
    // this.renderer.listen('window', 'click', event => {
    //   if (
    //     event.target !== this.menu.nativeElement &&
    //     event.target !== this.trigger.nativeElement
    //   ) {
    //     this.closeSidebar();
    //   }
    // });
  }

  openSidebar() {
    this.isSidebarOpened = true;
  }

  closeSidebar() {
    this.isSidebarOpened = false;
  }
}
