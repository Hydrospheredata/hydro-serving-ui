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
        this.baseUiUrl = `${environment.uiUrl}/weightedServices`;
        this.baseApiUrl = `${environment.apiUrl}/weightedServices`;
    }

    getServices() {
        return this.http.get(this.baseUiUrl)
                    .map((res: Response): any => {
                        return res.json();
                    })
    }

    updateService(service: Service): Observable<Service> {
      return this.http.put(this.baseUiUrl, service);
    }

    addService(service: Service) {
        return this.http.post(this.baseUiUrl, service);
    }

    deleteService(id: string) {
        return this.http.delete(`${this.baseApiUrl}/${id}`);
    }

    serveService(data): Observable<any> {
        return this.http.post(`${this.baseUiUrl}/serve`, data)
            .map((response: Response) => {
                return response.json();
            });
    }

}