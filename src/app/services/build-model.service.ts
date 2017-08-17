import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Response } from '@angular/http';
import { ModelRuntime } from '@models/model-runtime';
import { ModelRuntimeBuilder } from '@builders/model-runtime.builder';
import { HttpService } from '@services/http.service';

@Injectable()
export class BuildModelService {
  private baseAPIUrl;
  private baseUIUrl;

  constructor(
    private http: HttpService,
    private modelRuntimeBuilder: ModelRuntimeBuilder,
  ) {
    this.baseAPIUrl = `${environment.apiUrl}/model`;
    this.baseUIUrl = `${environment.uiUrl}/model`;
  }

  public build(options): Observable<ModelRuntime> {
    return this.http.post(`${this.baseUIUrl}/build`, options).map((res: Response) => {
      return this.extractModelRuntime(res);
    });
  }

  public testModel(params) {
    const url = `${this.baseUIUrl}/serve`;

    return this.http.post(url, params)
      .map((res: Response) => res.json());
  }

  public stopModel(id) {
    const url = `${this.baseUIUrl}/stopService/${id}`;
    return this.http.delete(url);
  }

  private extractModelRuntime(res: Response): ModelRuntime {
    let props = res.json();
    return this.modelRuntimeBuilder.build(props);
  }
}
