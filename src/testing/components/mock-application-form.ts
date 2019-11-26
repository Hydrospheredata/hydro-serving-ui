import { Output, Input, Component, EventEmitter } from '@angular/core';
import { IApplication } from '@shared/_index';

@Component({
  selector: 'hs-application-form',
  template: '',
})
export class ApplicationFormComponent {
  @Output() submitHandle: EventEmitter<any> = new EventEmitter();
  @Input() application: IApplication;
}
