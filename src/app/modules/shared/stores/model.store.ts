import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpModelsService } from '@shared/services/_index';
import { BuildModelService } from '@shared/services/_index';
import { Model, ModelBuild } from '@shared/models/_index';
import 'rxjs/add/operator/map';

@Injectable()
export class ModelStore {
  items: Observable<Model[]>;
  private _items: BehaviorSubject<Model[]>;
  private dataStore: Model[];
  private builds: ModelBuild[];

  constructor(private httpModelsService: HttpModelsService,
              private buildModelService: BuildModelService) {
    this.dataStore = [];
    this._items = <BehaviorSubject<Model[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  public getAll(): void {
    this.httpModelsService.getAll()
      .subscribe((data) => {
        this.dataStore = data;
        this.updateStore();
      });
  }

  private updateStore(): void {
    this._items.next(this.dataStore);
  }

  public updateModel(modelOptions): Observable<any> {
    return this.httpModelsService.updateModel(modelOptions)
    .map((model) => {
      this.updateItem(model);
      this.updateStore();
    });
  }

  private updateItem(item: Model): void {
    const idx = this.dataStore.findIndex((dataStoreItem) => dataStoreItem.id === item.id);
    const model = new Model(item);
    if (idx === -1) {
      this.dataStore.push(model);
    } else {
      this.dataStore[idx] = model;
    }
  }

  public testModel(params): Observable<any> {
    const service = this.buildModelService
      .testModel(params);
    return service;
  }

  public stopModel(id): Observable<any> {
    const service = this.buildModelService
      .stopModel(id);
    return service;
  }

  public getBuilds() {}

  public getBuildById() {}


}
