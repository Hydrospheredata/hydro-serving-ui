import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStore {
  items: Observable<any[]>;
  private _items: BehaviorSubject<any[]>;
  private dataStore: any[];

  constructor(private backendService) {
    this.dataStore = [];
    this._items = <BehaviorSubject<any[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  public getAll(): Observable<any[]> {
    return this.backendService.getAll().subscribe((data) => {
      this.dataStore = data
      this.updateStore();
    })
  }

  private updateStore(): void {
    this._items.next(this.dataStore);
  }
}
