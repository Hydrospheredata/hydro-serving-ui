import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';
import { RequestOptionsArgs } from '@angular/http';
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
    generateInputs(id: number): Observable<any>{
        const url = `${this.baseAPIUrl}/generateInputs/${id}`;
        return this.http.get(url).map((res: Response) => {
            return res.json();
        });
    }
    createModelRuntime() {}
    removeModelRuntime() {}
    updateModelRuntime() {}
    serveModelRuntime() {}

}
