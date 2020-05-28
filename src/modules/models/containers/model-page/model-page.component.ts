import { Component, OnInit } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { DialogDeleteModelComponent, SELECTED_MODEL } from '@models/components';
import { ModelsFacade } from '@models/store';
import { first } from '@node_modules/rxjs/internal/operators';
import { ModelVersion, Model } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss'],
})
export class ModelPageComponent implements OnInit {
  model$: Observable<Model>;
  modelVersions$: Observable<ModelVersion[]>;
  constructor(private facade: ModelsFacade, private dialog: DialogService) {}

  ngOnInit() {
    this.model$ = this.facade.getSelectedModel();
    this.modelVersions$ = this.facade.getSelectedModelVersions();
  }

  onDelete() {
    this.model$.pipe(first()).subscribe(model => {
      this.dialog.createDialog({
        component: DialogDeleteModelComponent,
        providers: [{ provide: SELECTED_MODEL, useValue: model }],
      });
    });
  }
}
