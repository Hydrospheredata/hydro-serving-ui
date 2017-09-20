import { Injectable } from '@angular/core';
import { HttpWeightedServicesService } from '@services/http-weighted-services.service';
import { WeightedService } from '@shared/models/_index';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WeightedServiceStore {
  items: Observable<WeightedService[]>;
  private _items: BehaviorSubject<WeightedService[]>;
  private dataStore: WeightedService[];

  constructor(private httpWeightedServicesService: HttpWeightedServicesService) {
    this.dataStore = [];
    this._items = <BehaviorSubject<WeightedService[]>>new BehaviorSubject([]);
    this.items = this._items.asObservable();
  }

  private updateStore(): void {
    this._items.next(this.dataStore);
  }

  getAll() {
    this.httpWeightedServicesService.getAll()
      .subscribe((data) => {
        this.dataStore = data;
        this.updateStore();
      });
  }

  getById(id: string) {
    this.httpWeightedServicesService.getAll()
      .subscribe((data) => {
        this.dataStore = data;
        this.updateStore();
      });
  }


  add(weightedService: WeightedService): Observable<string> {
    return this.httpWeightedServicesService.add(weightedService)
      .map((res) => {
        const result = res.json();
        this.dataStore.push(result);
        this.updateStore();
        return result;
      });
  }

  public update(weightedService: WeightedService): Observable<string> {
    return this.httpWeightedServicesService.update(weightedService)
      .map((res: any) => {
        const result = res.json();
        this.dataStore.push(result);
        this.updateStore();
        return result;
      });
  }


  private removeItem(id) {
    let index: number = this.dataStore.indexOf(id);
    this.dataStore.splice(index, 1);
    this.updateStore();
  }

  public delete(id): Observable<any> {
    return this.httpWeightedServicesService.delete(id)
      .map((res) => {
        this.removeItem(id);
      });
  }

}
