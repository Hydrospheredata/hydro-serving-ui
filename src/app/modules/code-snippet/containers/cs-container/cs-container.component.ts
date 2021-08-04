import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-container',
  templateUrl: './cs-container.component.html',
  styleUrls: ['./cs-container.component.scss'],
})
export class CsContainerComponent {
  @Input() commands: string[];

  constructor() {}
}
