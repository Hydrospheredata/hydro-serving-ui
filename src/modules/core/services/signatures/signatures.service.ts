
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class SignaturesService {

    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/model`;
    }

    public getModelVersionSignatures(versionId: number) {
        return this.http.get(`${this.baseAPIUrl}/version/${versionId}/flatContract`).pipe(
            map((res: Response): any => res));
    }
}
