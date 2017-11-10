import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from './http.service';
import { Service } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ServicesService {
    baseUiUrl: string;
    baseApiUrl: string;
    
    constructor(
        private http: HttpService
    ) {
        this.baseUiUrl = `${environment.uiUrl}/applications`;
        this.baseApiUrl = `${environment.apiUrl}/applications`;
    }

    getServices(): Observable<Service[]> {
        return this.http.get(this.baseUiUrl)
                    .map((res: Response): any => {
                        return res.json();
                    })
    }

    updateService(service: Service): Observable<Service> {
        return this.http.put(this.baseUiUrl, service);
    }

    addService(service: Service) {
        return this.http.post(this.baseUiUrl, service)
                    .map((res: Response): any => {
                        return res.json();
                    });
    }

    deleteService(id: number) {
        return this.http.delete(`${this.baseApiUrl}/${id}`);
    }

    serveService(data): Observable<any> {
        return this.http.post(`${this.baseApiUrl}/serve`, data)
            .map((response: Response) => {
                return response.json();
            });
    }

}