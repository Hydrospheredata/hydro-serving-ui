import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModelsHeaderService } from '@models/components/models-header/models-header.service';
import { Observable } from '@node_modules/rxjs';
import { Model, ModelVersion } from '@shared/models';

@Component({
  selector: 'hs-models-header-zen-mode',
  templateUrl: './models-header-zen-mode.component.html',
  styleUrls: ['./models-header-zen-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelsHeaderZenModeComponent implements OnInit {
  model$: Observable<Model>;
  modelVersion$: Observable<ModelVersion>;
  service$: Observable<string>;

  constructor(private readonly service: ModelsHeaderService) {}

  ngOnInit() {
    this.model$ = this.service.getModel();
    this.modelVersion$ = this.service.getModelVersion();
    this.service$ = this.service.getService();
  }

  onClickModelVersion() {
    this.service.onClickModelVersion();
  }
}
