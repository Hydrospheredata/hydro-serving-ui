import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Model } from '@models/model';
import { RuntimeType } from '@models/runtime-type';
import { ModelBuilder } from '@builders/model.builder';

@Injectable()
export class HttpModelsService {

  private baseUrl: string;
  private models: Model[];

  constructor(
    private http: Http,
    private modelBuilder: ModelBuilder
  ) {
    this.baseUrl = `${environment.host}:${environment.port}${environment.apiUrl}/model`;
  }

  public getAll(): Observable<Model[]> {
    const url = this.baseUrl + '/withInfo';
    return this.http.get(url).map((res: Response) => {
      let data = res.json();
      this.models = this.extractModels(data);
      return this.models;
    });
  }

  private extractModels(data) {
    let models: Model[] = [];
    for(let index in data) {
      let model = this.modelBuilder.build(data[index]);
      models.push(model);
    }
    return models;
  }

  public updateModel(model) {
    return this.http.put(this.baseUrl, model)
      .map((response: Response) => {
        return response.json();
      });
  }
}
