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

  constructor(
    private http: Http,
    private modelBuilder: ModelBuilder
  ) {
    this.baseUrl = `${environment.host}:${environment.port}/api/v1/model`
  }

  public getAll(): Observable<Model[]> {
    return this.http.get(this.baseUrl).map((res: Response) => {
      return this.extractModels(res)
    });
  }

  private extractModels(res: Response) {
    let data = res.json();
    let models :Model[] = [];
    for(let index in data) {
      let model = this.modelBuilder.build(data[index]);
      models.push(model);
    }
    return models;
  }
}
