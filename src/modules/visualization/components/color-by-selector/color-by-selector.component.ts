import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColorBy } from 'modules/visualization/services';

@Component({
  selector: 'hs-color-by-selector',
  templateUrl: './color-by-selector.component.html',
  styleUrls: ['./color-by-selector.component.scss'],
})
export class ColorBySelectorComponent {
  @Input() colorBy: ColorBy;
  @Output() colorByChanged: EventEmitter<ColorBy> = new EventEmitter();
  colorByTypes: ColorBy[] = ['class_label', 'metric'];

  onColorByChange(colorBy: ColorBy): void {
    this.colorByChanged.next(colorBy);
  }
}
