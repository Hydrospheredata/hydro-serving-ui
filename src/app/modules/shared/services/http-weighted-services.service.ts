import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { environment } from '../../../../environments/environment';
import { WeightedService } from '@models/weighted-service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpWeightedServicesService {

  private baseAPIUrl: string;

  constructor(private http: HttpService) {
    this.baseAPIUrl = `${environment.apiUrl}/weightedServices`;
  }

  getAll(): Observable<WeightedService[]> {
    return this.http.get(this.baseAPIUrl)
      .map((res: Response): any => {
        console.log(res);
        return this.toWeightedService(res.json());
      });
  }

  toWeightedService(services): WeightedService[] {
    let result: WeightedService[] = [];

    for (let i = 0; i < services.length; i++) {
      result.push(new WeightedService(services[i]));
    }

    return result;
  }

  update(service: WeightedService): Observable<WeightedService> {
    return this.http.put(this.baseAPIUrl, service);
  }

  add(service: WeightedService) {
    return this.http.post(this.baseAPIUrl, service);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseAPIUrl}/${id}`);
  }

}
