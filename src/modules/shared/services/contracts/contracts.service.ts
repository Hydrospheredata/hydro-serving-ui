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

    public getModelBuildContract(id: number) {
        return this.http.get(`${this.baseAPIUrl}/version/${id}/flatContract`)
            .map((res: Response): any => {
                return res.json();
            });
    }

}
