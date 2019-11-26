import {
  Directive,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModelVersion } from '@shared/_index';

@Directive({
  selector: '[hsUpdateModelVersion]',
})
export class UpdateModelVersionDirective {
  @Input() modelVersion: ModelVersion;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();
}
