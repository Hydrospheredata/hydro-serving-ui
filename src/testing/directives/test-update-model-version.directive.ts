import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';

@Directive({
  selector: '[hsUpdateModelVersion]',
})
export class UpdateModelVersionDirective {
  @Input() modelVersion: ModelVersion;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();
}
