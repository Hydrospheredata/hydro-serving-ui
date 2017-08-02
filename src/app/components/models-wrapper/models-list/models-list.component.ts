import { Component, OnInit } from '@angular/core';
import { ModelStore } from '@stores/model.store';
import { BuildModelService } from '@services/build-model.service';
import { Model } from '@models/model';

@Component({
  selector: 'hydro-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
  providers: [BuildModelService]
})
export class ModelsListComponent implements OnInit {
  public models: Model[];

  constructor(
    private modelStore: ModelStore,
    private buildModelService: BuildModelService
  ) { }

  ngOnInit() {
    this.modelStore.getAll()
    this.modelStore.items.subscribe((models) => {
      this.models = models
    })
  }

  buildModel(modelId: string, version?: string) {
    this.buildModelService.build(modelId, version).subscribe((modelRuntime) => {
      let model = this.models.find((item) => item.id === modelRuntime.modelId)
      model.lastModelRuntime = modelRuntime;
    })
  }

}
