import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ZenModeService } from '@core/services/zenmode.service';
import { ModelsFacade } from '@models/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './model-version-container.component.html',
  styleUrls: ['./model-version-container.component.scss'],
})
export class ModelVersionContainerComponent {
  modelVersion$ = this.modelsFacade.selectedModelVersion$;
  isZenMode$: Observable<boolean> = this.zenMode.isZenMode$;
  constructor(
    private modelsFacade: ModelsFacade,
    private location: Location,
    private zenMode: ZenModeService
  ) {}

  back() {
    this.location.back();
  }
}
