import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpModelServiceService } from '@services/http-model-service.service';
import { BuildModelService } from '@services/build-model.service';
import { Model } from '@models/model';
import 'rxjs/add/operator/map';

@Injectable()
export class ModelServiceStore {
  items: Observable<Model[]>;
  private _items: BehaviorSubject<Model[]>;
  private dataStore: Model[];

  constructor(private httpModelsServiceService: HttpModelServiceService,
              private buildModelService: BuildModelService) {
    this.dataStore = [];
    this._items = <BehaviorSubject<Model[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  public getAll(): void {
    this.httpModelsServiceService.getAll()
      .subscribe((data) => {
        this.dataStore = data;
        this.updateStore();
      });
  }

  private updateStore(): void {
    this._items.next(this.dataStore);
  }

  public updateModel(modelOptions) {
    return this.httpModelsServiceService.updateModel(modelOptions)
      .map((model) => {
        this.updateItem(model);
        this.updateStore();
      });
  }

  private updateItem(item: Model) {
    const idx = this.dataStore.findIndex((dataStoreItem) => dataStoreItem.id === item.id);
    const model = new Model(item);
    if (idx === -1) {
      this.dataStore.push(model);
    } else {
      this.dataStore[idx] = model;
    }
  }

}
