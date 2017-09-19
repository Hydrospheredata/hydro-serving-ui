import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '@services/http.service';
import { RequestOptionsArgs } from '@angular/http';
import { ModelRuntime } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ModelRuntimesService {
    baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/modelRuntime`;
    }

    getModelRuntimes() {
        return this.http.get(this.baseAPIUrl)
                    .map((res: Response): any => {
                      // console.log(res);
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
                      console.log(res);
                      return res.json();
                    });
    }
    createModelRuntime() {}
    removeModelRuntime() {}
    updateModelRuntime() {}
    serveModelRuntime() {}

}
