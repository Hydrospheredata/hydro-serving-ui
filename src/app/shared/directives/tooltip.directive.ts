import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[hsTippy]',
})
export class TippyDirective implements OnInit {
  @Input() public tippyOptions: Object;

  constructor(private el: ElementRef) {
    this.el = el;
  }

  ngOnInit() {
    tippy(this.el.nativeElement, this.tippyOptions || {});
  }
}
