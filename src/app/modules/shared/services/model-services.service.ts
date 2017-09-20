import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ModelServicesService {
    baseAPIUrl: string;
    servicesAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/modelService`;
        this.servicesAPIUrl = `${environment.apiUrl}/weightedServices`;
    }

    getModelServices() {
        return this.http.get(this.baseAPIUrl)
                    .map((res: Response): any => {
                      return res.json();
                    });
    }

    getModelService(id: number): Observable<any> {
        const url = `${this.baseAPIUrl}/${id}`;
        return this.http.get(url)
                    .map((res: Response): any => {
                      return res.json();
                    });
    }
    createModelService() {}
    removeModelService() {}
    updateModelService() {}
    
    serveModelService(data): Observable<any> {
        return this.http.post(`${this.baseAPIUrl}/serve`, data)
            .map((response: Response) => {
                return response.json();
            });
    }

}
