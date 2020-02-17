import { Component } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-model-version-page',
  templateUrl: './model-version-page.component.html',
  styleUrls: ['./model-version-page.component.scss'],
})
export class ModelVersionPageComponent {
  modelVersion$: Observable<ModelVersion> = this.facade.selectedModelVersion$;
  servables$ = this.facade.selectedServables$;
  signature$ = this.facade.signature$;
  constructor(private facade: ModelsFacade) {}
}
