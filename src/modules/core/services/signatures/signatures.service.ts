
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@core/services/http/_index';



@Injectable()
export class SignaturesService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/model`;
    }

    public getModelSignatures(id: number) {
        return this.http.get(`${this.baseAPIUrl}/${id}/flatContract`).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    public getModelVersionSignatures(versionId: number) {
        return this.http.get(`${this.baseAPIUrl}/version/${versionId}/flatContract`).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

    public updateModelSignatures(id: number, contract) {
        return this.http.post(`${this.baseAPIUrl}/${id}/contract/flat`, contract).pipe(
            map((res: Response): any => {
                return res.json();
            }));
    }

}
