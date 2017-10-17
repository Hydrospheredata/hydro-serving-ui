import * as stringDecoder from 'string_decoder';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from './http.service';
import { RequestOptionsArgs } from '@angular/http';
import { ModelRuntime } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ModelRuntimesService {
    baseAPIUrl: string;
    baseUIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/modelRuntime`;
        this.baseUIUrl = `${environment.uiUrl}/modelRuntime`;
      }

    getModelRuntimes() {
        return this.http.get(this.baseAPIUrl)
                    .map((res: Response): any => {
                      return res.json();
                    });
    }
    getModelRuntimesWithInfo(modelId: string) {
      return this.http.get(`${this.baseUIUrl}/withInfo/${modelId}`)
                  .map((res: Response): any => {
                    return res.json();
                  });
  }

    getModelRuntimeByModelId(id: number, maximum: number): Observable<any> {
        const url = `${this.baseAPIUrl}/${id}/last`;
        const requestOptions: RequestOptionsArgs = {
          params: {maximum}
        };
        return this.http.get(url, requestOptions)
                    .map((res: Response): any => {
                      return res.json();
                    });
    }
    createModelRuntime() {}
    removeModelRuntime() {}
    updateModelRuntime() {}
    serveModelRuntime() {}

}
