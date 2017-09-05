import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpModelRuntimeService } from '@services/http-model-runtime.service';
import 'rxjs/add/operator/map';
import { ModelRuntime } from '@models/model-runtime';

@Injectable()
export class ModelRuntimeStore {
  items: Observable<ModelRuntime[]>;
  private _items: BehaviorSubject<ModelRuntime[]>;
  private dataStore: ModelRuntime[];

  constructor(private httpModelRuntimeService: HttpModelRuntimeService) {
    this.dataStore = [];
    this._items = <BehaviorSubject<ModelRuntime[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  public getAll(): void {
    this.httpModelRuntimeService.getAll()
      .subscribe((data) => {
        this.dataStore = data;
        this.updateStore();
      });
  }

  private updateStore(): void {
    this._items.next(this.dataStore);
  }

  private updateItem(item: ModelRuntime) {
    const idx = this.dataStore.findIndex((dataStoreItem) => dataStoreItem.id === item.id);
    const modelRuntime = new ModelRuntime(item);
    if (idx === -1) {
      this.dataStore.push(modelRuntime);
    } else {
      this.dataStore[idx] = modelRuntime;
    }
  }

}
