import { Component, OnInit } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-model-versions',
  templateUrl: './model-versions.component.html',
  styleUrls: ['./model-versions.component.scss'],
})
export class ModelVersionsComponent implements OnInit {
  modelVersions$: Observable<ModelVersion[]> = this.facade
    .selectedModelVersions$;
  constructor(private facade: ModelsFacade) {}

  ngOnInit() {}
}
