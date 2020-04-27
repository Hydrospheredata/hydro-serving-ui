import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'hs-model-versions-tags',
  template: '',
})
export class ModelVersionsTagsComponent {
  @Output() listChanged: EventEmitter<any> = new EventEmitter();
}
