import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http/_index';
import { Application } from '@shared/models/_index';



@Injectable()
export class ApplicationsService {
    
    baseApiUrl: string;
    
    constructor(
        private http: HttpService
    ) {
        this.baseApiUrl = `${environment.apiUrl}/applications`;
    }

    getApplications(): Observable<Application[]> {
        return this.http.get(this.baseApiUrl)
            .map((res: Response): any => {
                console.log(res.json());
                return res.json();
            });
    }

    updateApplication(application: Application): Observable<Application> {
        return this.http.put(this.baseApiUrl, application)
            .map((res: Response): any => {
                return res.json();
            });
    }

    addApplication(application: Application) {
        return this.http.post(this.baseApiUrl, application)
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