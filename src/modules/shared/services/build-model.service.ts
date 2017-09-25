import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '@environments/environment';
import { Response } from '@angular/http';
import { ModelRuntime } from '@shared/models/_index';
import { ModelRuntimeBuilder } from '@shared/builders/_index';
import { HttpService } from './http.service';

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

  public stopModel(id): Observable<any> {
    const url = `${this.baseUIUrl}/stopService/${id}`;
    return this.http.delete(url).map((res: Response) => {});
  }

  private extractModelRuntime(res: Response): ModelRuntime {
    const props = res.json();
    return this.modelRuntimeBuilder.build(props);
  }
}
