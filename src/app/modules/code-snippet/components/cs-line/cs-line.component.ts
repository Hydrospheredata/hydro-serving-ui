import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-line',
  templateUrl: './cs-line.component.html',
  styleUrls: ['./cs-line.component.scss'],
})
export class CsLineComponent {
  @Input() command: string;
  public copy = false;

  constructor() {}

  copySnippet(line) {
    window.navigator.clipboard.writeText(line.value);
    this.copy = true;
    setTimeout(() => {
      this.copy = false;
    }, 5000);
  }
}
