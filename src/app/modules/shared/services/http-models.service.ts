import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import { Response } from '@angular/http';
import { Model } from '@models/model';
import { ModelBuild } from '@models/model-build';
import { ModelBuilder } from '@builders/model.builder';
import { ModelBuildBuilder } from '@builders/model-build.builder';
import { HttpService } from '@services/http.service';

@Injectable()
export class HttpModelsService {

  private baseAPIUrl: string;
  private baseUIUrl: string;
  private models: Model[];
  private builds: ModelBuild[];

  constructor(
    private http: HttpService,
    private modelBuilder: ModelBuilder,
    private modelBuildBuilder: ModelBuildBuilder
  ) {
    this.baseAPIUrl = `${environment.apiUrl}/model`;
    this.baseUIUrl = `${environment.uiUrl}/model`;
  }

  public getAll(): Observable<Model[]> {
    const url = `${this.baseUIUrl}/withInfo`;
    return this.http.get(url)
      .map((res: Response) => {
        const data = res.json();
        this.models = this.extractModels(data);
        return this.models;
      });
  }

  public getAllBuilds(): Observable<ModelBuild[]> {
    const url = `${this.baseAPIUrl}/builds`;
    return this.http.get(url)
      .map((res: Response) => {
        const data = res.json();
        this.builds = this.extractBuilds(data);
        return this.builds;
      });
  }

  public getBuildsByModel(id: string): Observable<ModelBuild[]> {
    const url = `${this.baseAPIUrl}/builds/${id}`;
    return this.http.get(url)
      .map((res: Response) => {
        const data = res.json();
        console.log(data);
        this.builds = this.extractBuilds(data);
        return this.builds;
      });
  }

  private extractBuilds(data) {
    return data.map(build => {
      return this.modelBuildBuilder.build(build);
    });
  }

  private extractModels(data) {
    const models: Model[] = [];
    for (const index in data) {
      const model = this.modelBuilder.build(data[index]);
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
