import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

type buttonKinds = 'base' | 'flat' | 'stroked';
type buttonColors = 'base' | 'primary' | 'accent' | 'warning' | 'cyan';

@Component({
  selector: 'button [hs-button]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
  @Input() kind: buttonKinds = 'base';
  @Input() color: buttonColors = 'base';

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    (this.elRef.nativeElement as HTMLElement).classList.add('hs-button');
    (this.elRef.nativeElement as HTMLElement).classList.add(
      `hs-button--${this.kind}`,
    );
    (this.elRef.nativeElement as HTMLElement).classList.add(
      `hs-button--${this.kind}-${this.color}`,
    );
  }
}
