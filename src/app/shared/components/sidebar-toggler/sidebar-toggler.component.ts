import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'hs-sidebar-toggler',
  templateUrl: './sidebar-toggler.component.html',
  styleUrls: ['./sidebar-toggler.component.scss'],
})
export class SidebarTogglerComponent {
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @ViewChild('toggler') toggler: ElementRef;
  @ViewChild('toggleButton') toggleButton: ElementRef;

  // constructor(private renderer: Renderer2) {
  //   this.renderer.listen('window', 'click', event => {
  //     if (event.target !== this.toggler.nativeElement) {
  //       this.isOpen = false;
  //       this.isOpenChange.emit(this.isOpen);
  //     }
  //   });
  // }

  handleClick(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }
}
