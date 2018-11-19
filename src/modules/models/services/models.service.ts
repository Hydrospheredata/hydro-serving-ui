
import { Injectable } from '@angular/core';
import { NewHttpService } from '@core/services/new_http/new_http.service';
import { environment } from '@environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class ModelsService {

    private baseAPIUrl: string;

    constructor(
        private http: NewHttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/model`;
    }

    public getModels() {
        return this.http.get(this.baseAPIUrl).pipe(
            map((res: Response): any => res)
        );
    }

    public getModelBuilds(id: number) {
        return this.http.get(`${this.baseAPIUrl}/builds/${id}`).pipe(
            map((res: Response): any => res)
        );
    }

    public getAllVersions() {
        return this.http.get(`${this.baseAPIUrl}/version`).pipe(
            map((res: Response): any => res)
        );
    }

    // TODO: remove?
    public buildModel(options) {
        const updateModelUrl = `${this.baseAPIUrl}/build`;
        return this.http.post(updateModelUrl, options).pipe(
            map((res: Response): any => res));
    }

    public deleteModel(modelId) {
        return this.http.delete(`${this.baseAPIUrl}/${modelId}`);
    }
}
