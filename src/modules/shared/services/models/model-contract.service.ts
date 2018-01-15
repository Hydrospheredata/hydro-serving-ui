import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';



@Injectable()
export class ModelContractService {
    baseUIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseUIUrl = `${environment.uiUrl}/model/contract`;
    }

    getContract(runtimeId) {
        return this.http.get(`${this.baseUIUrl}/${runtimeId}`)
            .map((res: Response): any => {
                return res.json();
            });
    }

}
