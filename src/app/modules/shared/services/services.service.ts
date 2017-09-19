import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '@services/http.service';
import { Service } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ServicesService {
    baseAPIUrl: string;
    
    constructor(
        private http: HttpService
    ) {
        this.baseAPIUrl = `${environment.apiUrl}/weightedServices`;
    }

    getServices() {
        return this.http.get(this.baseAPIUrl)
                    .map((res: Response): any => {
                        return res.json();
                    })
    }

    updateService(service: Service): Observable<Service> {
      return this.http.put(this.baseAPIUrl, service);
    }

    addService(service: Service) {
        return this.http.post(this.baseAPIUrl, service);
    }

    deleteService(id: string) {
        return this.http.delete(`${this.baseAPIUrl}/${id}`);
    }

}