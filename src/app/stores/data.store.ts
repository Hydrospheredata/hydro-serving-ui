import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStore {
  items: Observable<any[]>;
  private _items: BehaviorSubject<any[]>;
  private dataStore: any[];

  constructor() {
    this.dataStore = [];
    this._items = <BehaviorSubject<any[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }
}
