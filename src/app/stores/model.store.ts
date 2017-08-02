import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpModelsService } from  '@services/http-models.service';
import { Model } from '@models/model';
import 'rxjs/add/operator/map';

@Injectable()
export class ModelStore {
  items: Observable<Model[]>;
  private _items: BehaviorSubject<Model[]>;
  private dataStore: Model[];

  constructor(private backendService: HttpModelsService) {
    this.dataStore = [];
    this._items = <BehaviorSubject<Model[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  public getAll(): void {
    this.backendService.getAll().subscribe((data) => {
      this.dataStore = data
      this.updateStore();
    })
  }

  private updateStore(): void {
    this._items.next(this.dataStore);
  }

  private updateItem(item: Model) {
    const idx = this.dataStore.findIndex((item) => item.id === item.id);
    if (idx === -1) {
      this.dataStore.push(item);
    } else {
      this.dataStore[idx] = item;
    }
  }
}
