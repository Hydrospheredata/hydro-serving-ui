import { Component, OnInit } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Observable } from '@node_modules/rxjs';
import { ModelVersion } from '@shared/models';
import { neitherNullNorUndefined } from '@shared/utils';

@Component({
  selector: 'hs-model-version-details-container',
  templateUrl: './model-version-details-container.component.html',
  styleUrls: ['./model-version-details-container.component.css'],
})
export class ModelVersionDetailsContainerComponent implements OnInit {
  modelVersion$: Observable<
    ModelVersion
  > = this.facade.selectedModelVersion$.pipe(neitherNullNorUndefined);
  servables$ = this.facade.selectedServables$;
  signature$ = this.facade.signature$;

  constructor(private facade: ModelsFacade) {}

  ngOnInit() {}
}
