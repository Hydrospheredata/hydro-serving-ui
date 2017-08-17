import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Response } from '@angular/http';
import { Model } from '@models/model';
import { ModelBuilder } from '@builders/model.builder';
import { HttpService } from '@services/http.service';

@Injectable()
export class HttpModelsService {

  private baseAPIUrl: string;
  private baseUIUrl: string;
  private models: Model[];

  constructor(
    private http: HttpService,
    private modelBuilder: ModelBuilder
  ) {
    this.baseAPIUrl = `${environment.apiUrl}/model`;
    this.baseUIUrl = `${environment.uiUrl}/model`;
  }

  public getAll(): Observable<Model[]> {
    const url = `${this.baseUIUrl}/withInfo`;
    return this.http.get(url)
      .map((res: Response) => {
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
    return this.http.put(this.baseAPIUrl, model)
      .map((response: Response) => {
        return response.json();
      });
  }


}
