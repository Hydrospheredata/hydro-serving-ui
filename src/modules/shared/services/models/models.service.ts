import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';
import { Model } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ModelsService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/model`;
    }

    public getModels() {
        return this.http.get(this.baseAPIUrl)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public getModelBuilds(id: string) {
        return this.http.get(`${this.baseAPIUrl}/builds/${id}`)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public getAllVersions() {
        return this.http.get(`${this.baseAPIUrl}/version`)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public buildModel(options): Observable<any> {
        const updateModelUrl = `${this.baseAPIUrl}/build`;
        return this.http.post(updateModelUrl, options)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public addModel(model: Model) {
        return this.http.post(this.baseAPIUrl, model);
    }

}
