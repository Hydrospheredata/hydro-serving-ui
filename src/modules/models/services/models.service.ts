
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@core/services/http/_index';



@Injectable()
export class ModelsService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/model`;
    }

    public getModels() {
        return this.http.get(this.baseAPIUrl).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    public getModelBuilds(id: number) {
        return this.http.get(`${this.baseAPIUrl}/builds/${id}`).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    public getAllVersions() {
        return this.http.get(`${this.baseAPIUrl}/version`).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    public buildModel(options) {
        const updateModelUrl = `${this.baseAPIUrl}/build`;
        return this.http.post(updateModelUrl, options).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    public deleteModel(modelId) {
        return this.http.delete(`${this.baseAPIUrl}/${modelId}`);
    }

}
