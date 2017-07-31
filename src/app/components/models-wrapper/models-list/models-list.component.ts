import { Component, OnInit } from '@angular/core';
import { ModelStore } from '@stores/model.store';

@Component({
  selector: 'hydro-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit {
  private  models;

  constructor(private modelStore: ModelStore) { }

  ngOnInit() {
    this.modelStore.getAll()
    this.modelStore.items.subscribe((models) => {
      this.models = models
    })
  }

}
