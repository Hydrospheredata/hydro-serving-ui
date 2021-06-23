import { Output, Input, Component, EventEmitter } from '@angular/core';
import { Application } from '@app/core/data/types';

@Component({
  selector: 'hs-application-form',
  template: '',
})
export class ApplicationFormComponent {
  @Output() submitHandle: EventEmitter<any> = new EventEmitter();
  @Input() application: Application;
}
