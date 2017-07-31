import { Injectable } from '@angular/core';
import { DataStore } from '@stores/data.store';
import { HttpModelsService } from '@services/http-models.service';

@Injectable()
export class ModelStore extends DataStore {

  constructor(backendService: HttpModelsService) {
    super(backendService);
  }
}
