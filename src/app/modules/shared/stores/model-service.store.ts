import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpModelServiceService } from '@shared/services/_index';
import { Model, ModelService } from '@shared/models/_index';
// import { Model } from '@models/model';
import 'rxjs/add/operator/map';

@Injectable()
export class ModelServiceStore {
  items: Observable<ModelService[]>;
  private _items: BehaviorSubject<ModelService[]>;
  private dataStore: ModelService[];

  constructor(private httpModelsServiceService: HttpModelServiceService) {
    this.dataStore = [];
    this._items = <BehaviorSubject<ModelService[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  public getAll(): Subscription {
    return this.httpModelsServiceService.getAll()
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

  private updateItem(item: ModelService) {
    const idx = this.dataStore.findIndex((dataStoreItem) => dataStoreItem.serviceId === item.serviceId);
    const model = new ModelService(item);
    if (idx === -1) {
      this.dataStore.push(model);
    } else {
      this.dataStore[idx] = model;
    }
  }

  public serve(modelService: ModelService): Observable<any> {
    return this.httpModelsServiceService.serve(modelService)
      .map((response: Response) => response);
  }

}
