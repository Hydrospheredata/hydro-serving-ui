import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ModelsFacade } from '@models/store';

@Component({
  templateUrl: './model-version-container.component.html',
  styleUrls: ['./model-version-container.component.scss'],
})
export class ModelVersionContainerComponent {
  public modelVersion$ = this.modelsFacade.selectedModelVersion$;

  constructor(private modelsFacade: ModelsFacade, private location: Location) {}

  back() {
    this.location.back();
  }
}
