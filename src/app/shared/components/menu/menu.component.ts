import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'hs-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() isSidebarOpened;
  @Output() isSidebarOpenedChange = new EventEmitter<boolean>();
  @ViewChild('navItem') toggler: ElementRef;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', event => {
      if (
        event.target.closest('.header-nav__item') ||
        event.target.closest('.header-info__link')
      ) {
        this.isSidebarOpened = !this.isSidebarOpened;
        this.isSidebarOpenedChange.emit(this.isSidebarOpened);
      }
    });
  }
}
