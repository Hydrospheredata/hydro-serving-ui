import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[hsAutofocused]',
})
export class AutofocusedDirective implements OnInit {
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => this.elRef.nativeElement.focus(), 100);
  }
}
