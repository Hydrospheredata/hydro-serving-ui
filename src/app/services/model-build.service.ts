import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ModelRuntime } from '@models/model-runtime';
import { ModelRuntimeBuilder } from '@builders/model-runtime.builder'

@Injectable()
export class ModelBuildService {
  private baseUrl: string;

  constructor(
    private http: Http,
    private modelRuntimeBuilder: ModelRuntimeBuilder
  ) {
    this.baseUrl = `${environment.host}:${environment.port}/api/v1/model/build` 
  }

  public build(modelId: string, version?: string): Observable<ModelRuntime> {
    let body = { modelId: modelId, version: version }
    return this.http.post(this.baseUrl, body).map((res: Response) => {
      return this.extractModelRuntime(res);
    })
  }

  private extractModelRuntime(res: Response): ModelRuntime {
    let props = res.json();
    return this.modelRuntimeBuilder.build(props);
  }
}
