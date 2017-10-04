import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from './http.service';
import { Service } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ServicesService {
    baseUrl: string;
    
    constructor(
        private http: HttpService
    ) {
        this.baseUrl = `${environment.uiUrl}/weightedServices`;
    }

    getServices() {
        return this.http.get(this.baseUrl)
                    .map((res: Response): any => {
                        console.log(res);
                        return res.json();
                    })
    }

    updateService(service: Service): Observable<Service> {
      return this.http.put(this.baseUrl, service);
    }

    addService(service: Service) {
        return this.http.post(this.baseUrl, service);
    }

    deleteService(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    serveService(data): Observable<any> {
        return this.http.post(`${this.baseUrl}/serve`, data)
            .map((response: Response) => {
                return response.json();
            });
    }

}