import { Component, OnInit } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss'],
})
export class ModelPageComponent implements OnInit {
  modelVersions$: Observable<ModelVersion[]> = this.facade.selectedModelVersions$;
  constructor(private facade: ModelsFacade) {}

  ngOnInit() {}
}
