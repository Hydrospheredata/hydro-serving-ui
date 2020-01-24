import { Component } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Model } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent {
  models$: Observable<Model[]> = this.modelsFacade.allModels$;
  constructor(private modelsFacade: ModelsFacade) {}
}
