import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Model } from '@models/model';
import { RuntimeType } from '@models/runtime-type';

@Injectable()
export class HttpModelsService {

  private baseUrl: string;

  constructor(private http: Http) {
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
      let model = this.toModel(data[index]);
      models.push(model);
    }
    return models;
  }

  private toModel(data): Model {
    let runtimeType: RuntimeType;

    if(data['runtimeType']) {
      runtimeType = new RuntimeType({
        name: data['runtimeType']['name'],
        version: data['runtimeType']['version']
      });
    }

    let model = new Model({
      id: data['id'],
      description: data['description'],
      lastBuildTimestamp: data['lastBuildTimestamp'],
      lastUpdateTimestamp: data['lastUpdateTimestamp'],
      lastVersion: data['lastVersion'],
      name: data['name'],
      source: data['source'],
      watchEnabled: data['watchEnabled'],
      runtimeType: runtimeType
    });
    return model;
  }
}
