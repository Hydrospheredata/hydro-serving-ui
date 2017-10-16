import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ModelServicesService {
    baseAPIUrl: string;

    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/modelService`;
    }

    getModelServices() {
        return this.http.get(this.baseAPIUrl)
                    .map((res: Response): any => {
                      return res.json();
                    });
    }

    getModelService(id: number) {
        const url = `${this.baseAPIUrl}/${id}`;
        return this.http.get(url)
                    .map((res: Response): any => {
                      return res.json();
                    });
    }

    getModelRuntimes(id: number): Observable<any> {
        const countRuntimes = 10;
        const url = `${this.baseAPIUrl}/${id}/last?maximum=${countRuntimes}`;
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
