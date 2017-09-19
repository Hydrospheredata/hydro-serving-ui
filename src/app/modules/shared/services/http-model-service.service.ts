import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import { Response } from '@angular/http';
import { Model } from '@models/model';
import { ModelBuilder } from '@builders/model.builder';
import { HttpService } from '@services/http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpModelServiceService {
  private baseAPIUrl: string;
  private models: Model[];

  constructor(
    private http: HttpService,
    private modelBuilder: ModelBuilder
  ) {
    this.baseAPIUrl = `${environment.apiUrl}/modelService`;
  }

  public getAll(): Observable<any> {
    const url = `${this.baseAPIUrl}`;
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      });
  }

  public createService(serviceName: string, modelRuntimeId: number): Observable<any> {
    const url = `${this.baseAPIUrl}`;
    const payload = {serviceName, modelRuntimeId};
    return this.http.post(url, payload).map((response: Response) => response.json());
  }

  public removeService(id: number): Observable<any> {
    const url = `${this.baseAPIUrl}/${id}`;
    return this.http.delete(url)
    .map((res: Response) => {});
  }

  public getModelService(id: number): Observable<any> {
    const url = `${this.baseAPIUrl}/${id}`;
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      });
  }

  public extractModels(data) {
    const models: Model[] = [];
    for (const index in data) {
      if (data[index].serviceId < 1) {
        continue;
      }
      const model = this.modelBuilder.build({model: data[index].modelRuntime});
      models.push(model);
    }
    return models;
  }

  public updateModel(model) {
    return this.http.put(this.baseAPIUrl, model)
      .map((response: Response) => {
        return response.json();
      });
  }

  public serve(data): Observable<any> {
    return this.http.post(`${this.baseAPIUrl}/serve`, data)
      .map((response: Response) => {
        return response.json();
      });
  }

}
