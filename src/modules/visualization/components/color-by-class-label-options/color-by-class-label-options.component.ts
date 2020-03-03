import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hs-color-by-class-label-options',
  templateUrl: './color-by-class-label-options.component.html',
  styleUrls: ['./color-by-class-label-options.component.scss'],
})
export class ColorByClassLabelOptionsComponent {
  @Input() labelName: string;
  @Input() labelNames: string[];
  @Output() labelNameChanged: EventEmitter<string> = new EventEmitter();

  onChange(labelName: string): void {
    this.labelNameChanged.next(labelName);
  }
}
