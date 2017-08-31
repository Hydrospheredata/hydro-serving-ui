import { Injectable } from '@angular/core';
import { HttpWeightedServicesService } from '@services/http-weighted-services.service';
import { WeightedService } from '@models/weighted-service';
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
    let self = this;
    return this.httpWeightedServicesService.update(weightedService)
      .map((res: any) => {
        const result = res.json();
        // this.dataStore.push(result);
        this.updateStore();
        return result;
      });
  }

}
