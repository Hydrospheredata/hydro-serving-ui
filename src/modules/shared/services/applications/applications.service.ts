import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';
import { Application } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ApplicationsService {
    baseUiUrl: string;
    baseApiUrl: string;
    
    constructor(
        private http: HttpService
    ) {
        this.baseUiUrl = `${environment.uiUrl}/applications`;
        this.baseApiUrl = `${environment.apiUrl}/applications`;
    }

    getServices(): Observable<Application[]> {
        return this.http.get(this.baseUiUrl)
            .map((res: Response): any => {
                return res.json();
            });
    }

    updateService(service: Application): Observable<Application> {
        return this.http.put(this.baseUiUrl, service)
            .map((res: Response): any => {
                return res.json();
            });
    }

    addService(service: Application) {
        return this.http.post(this.baseUiUrl, service)
            .map((res: Response): any => {
                return res.json();
            });
    }

    deleteApplication(id: number) {
        return this.http.delete(`${this.baseApiUrl}/${id}`);
    }

    serveService(data, serviceName): Observable<any> {
        return this.http.post(`${this.baseApiUrl}/serveByName/${serviceName}`, data)
            .map((response: Response) => {
                return response.json();
            });
    }

}