import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ModelsFacade } from '@app/core/facades/models.facade';
import { ModelVersion } from '@app/core/data/types/model-version';

@Component({
  selector: 'hs-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss'],
})
export class ModelDetailsComponent implements OnInit {
  modelVersions$: Observable<ModelVersion[]>;

  constructor(private facade: ModelsFacade) {}

  ngOnInit() {
    this.modelVersions$ = this.facade.selectedModelVersions();
  }
}
