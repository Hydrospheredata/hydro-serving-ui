import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';



@Injectable()
export class ContractsService {
    
    private baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/model`;
    }

    public getModelContracts(id: number) {
        return this.http.get(`${this.baseAPIUrl}/${id}/flatContract`)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public getModelBuildContracts(id: number) {
        return this.http.get(`${this.baseAPIUrl}/version/${id}/flatContract`)
            .map((res: Response): any => {
                return res.json();
            });
    }

    public updateModelContract(id: number, contract) {
        return this.http.post(`${this.baseAPIUrl}/${id}/contract/flat`, contract)
            .map((res: Response): any => {
                return res.json();
            });
    }

}
